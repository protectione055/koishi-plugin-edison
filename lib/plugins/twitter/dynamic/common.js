"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterToken = exports.twitterCookie = exports.twitterSearch = exports.twitterList = exports.twitterRemove = exports.twitterBatch = exports.twitterAdd = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-03 12:57:50
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-11 11:30:19
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\dynamic\common.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../../../config"));
const render_1 = require("./render");
const _1 = require(".");
async function twitterAdd({ session }, twitter, list, _ctx) {
    const { twitterId, twitterName, twitterRestId } = twitter;
    if (session.channel.twitter.dynamic.find(notification => notification.twitterRestId === twitterRestId))
        return '该用户已在监听列表中。';
    try {
        const notification = {
            botId: `${session.platform}:${session.bot.userId || session.bot.selfId}`,
            twitterId,
            twitterName,
            twitterRestId,
        };
        session.channel.twitter.dynamic.push(notification);
        (list[twitterRestId] || (list[twitterRestId] = [])).push([
            {
                id: session.channel.id,
                guildId: session.channel.guildId,
                platform: session.platform,
                twitter: session.channel.twitter,
            },
            notification,
        ]);
        return `成功添加: ${twitterName}`;
    }
    catch (e) {
        _1.logger.error(`添加推特用户 ${twitterId} 失败: [${e}]`);
        return `请求失败，请检查 id 是否正确或重试${e}`;
    }
}
exports.twitterAdd = twitterAdd;
async function twitterBatch({ session }, twitter, list, _ctx) {
    const { twitterId: twitterIds, twitterName: twitterNames, twitterRestId: twitterRestIds } = twitter;
    const result = [];
    const error = [];
    for (let i = 0; i < twitterIds.length; i++) {
        const twitterId = twitterIds[i].trim();
        const twitterName = twitterNames[i];
        const twitterRestId = twitterRestIds[i];
        if (session.channel.twitter.dynamic.find(notification => notification.twitterRestId === twitterRestId))
            continue;
        try {
            const notification = {
                botId: `${session.platform}:${session.bot.userId || session.bot.selfId}`,
                twitterId,
                twitterName,
                twitterRestId,
            };
            session.channel.twitter.dynamic.push(notification);
            (list[twitterRestId] || (list[twitterRestId] = [])).push([
                {
                    id: session.channel.id,
                    guildId: session.channel.guildId,
                    platform: session.platform,
                    twitter: session.channel.twitter,
                },
                notification,
            ]);
            result.push(`${twitterName}`);
        }
        catch (e) {
            _1.logger.error(`添加推特用户 ${twitterId} 失败: [${e}]`);
            error.push(`${twitterId}: [${e}]`);
        }
    }
    if (result.length)
        return `成功添加: \n${result.join('\n')}`;
    else if (error.length)
        return `以下用户添加失败: \n${error.join('\n')}`;
    else
        return '所有用户已在监听列表中。';
}
exports.twitterBatch = twitterBatch;
async function twitterRemove({ session }, twitter, list) {
    const { channel } = session;
    const { twitterRestId } = twitter;
    const index = channel.twitter.dynamic.findIndex(notification => notification.twitterRestId === twitterRestId);
    if (index === -1)
        return '该用户不在监听列表中。';
    channel.twitter.dynamic.splice(index, 1);
    const listIndex = list[twitterRestId].findIndex(([{ id, guildId, platform }, notification]) => {
        return (channel.id === id
            && channel.guildId === guildId
            && channel.platform === platform
            && notification.twitterRestId === twitterRestId);
    });
    if (listIndex === -1)
        throw new Error('Data is out of sync.');
    const name = list[twitterRestId][listIndex]?.[1].twitterName;
    delete list[twitterRestId];
    return `成功删除: ${name}`;
}
exports.twitterRemove = twitterRemove;
async function twitterList({ session, }) {
    if (session.channel.twitter.dynamic.length === 0)
        return '监听列表为空。';
    return session.channel.twitter.dynamic
        .map(notification => `- @${notification.twitterId} 「${notification.twitterName}」`)
        .join('\n');
}
exports.twitterList = twitterList;
async function twitterSearch(_, twitter, _list, ctx, config) {
    const { twitterRestId } = twitter;
    try {
        const res = await (0, utils_1.getTwitterTweets)(twitterRestId, ctx, _1.logger);
        _1.logger.info(`推特获取成功: ${JSON.stringify(res.tweets)}`);
        if (!res || res.tweets.length === 0)
            return '该用户没有动态。';
        return (0, render_1.renderFunction)(ctx, res.tweets[0], res.user_info, config, false);
    }
    catch (e) {
        _1.logger.error(`推特动态获取失败: ${e.message}`);
        return `动态获取失败${e}`;
    }
}
exports.twitterSearch = twitterSearch;
async function twitterCookie({ session, options, }, _twitter, _list, ctx) {
    try {
        if (!options.cookie)
            return '请提供cookie';
        const cookieRegex = /([^=;\s]+)=([^=;\s]*)/g;
        if (!cookieRegex.test(session.content))
            return 'cookie 格式错误';
        const cookies = session.content.match(cookieRegex);
        const cookieJson = {
            ct0: '',
            auth_token: '',
        };
        const cookieStringObject = {};
        cookies.forEach((cookie) => {
            const [key, value] = cookie.split('=');
            if (['ct0', 'auth_token'].includes(key))
                cookieJson[key] = value;
            cookieStringObject[key] = value;
        });
        if (!cookieJson.auth_token || !cookieJson.ct0)
            return 'cookie 格式中缺少 auth_token 或 ct0';
        const { twitterDir, twitterCookiePath } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
        if (!(await node_fs_1.default.promises.stat(twitterDir)).isDirectory())
            await node_fs_1.default.promises.mkdir(twitterDir, { recursive: true });
        await node_fs_1.default.promises.writeFile(twitterCookiePath, JSON.stringify({ cookieString: Object.entries(cookieStringObject).map(([key, value]) => `${key}=${value}`).join(';'), authCookie: { ...cookieJson } }));
        ctx.http.config.headers['x-csrf-token'] = cookieJson.ct0;
        ctx.http.config.headers.cookie = session.content;
        return 'cookie 更新成功';
    }
    catch (err) {
        _1.logger.error(`Failed to update cookie. ${err}`);
        return `cookie 更新失败: ${err}`;
    }
}
exports.twitterCookie = twitterCookie;
async function twitterToken({ session, options, }, _twitter, _list, ctx) {
    try {
        if (!options.token)
            return '请提供token';
        const token = options.token;
        ctx.http.config.headers['Authorization'] = `Bearer ${token}`;
        const { twitterDir, twitterTokenPath } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
        if (!(await node_fs_1.default.promises.stat(twitterDir)).isDirectory())
            await node_fs_1.default.promises.mkdir(twitterDir, { recursive: true });
        await node_fs_1.default.promises.writeFile(twitterTokenPath, JSON.stringify({ bearer_token: token }));
        return 'token 更新成功';
    }
    catch (err) {
        _1.logger.error(`Failed to update token. ${err}`);
        return `token 更新失败: ${err}`;
    }
}
exports.twitterToken = twitterToken;
