"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.logger = exports.Config = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-01-29 14:43:47
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-17 14:55:43
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\dynamic\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const fs = __importStar(require("node:fs"));
const koishi_1 = require("koishi");
const utils_1 = require("../utils");
const config_1 = __importDefault(require("../../../config"));
const listen_1 = require("./listen");
const dynamic_strategy_1 = require("./dynamic.strategy");
exports.Config = koishi_1.Schema.object({
    interval: koishi_1.Schema.number()
        .description('请求之间的间隔 (秒) 注: 最低 90 秒!')
        .default(90)
        .min(90),
    useImage: koishi_1.Schema.boolean().default(false).description('是否使用图片模式 (需要 puppeteer 支持!)'),
    usePure: koishi_1.Schema.boolean()
        .default(false)
        .description('是否使用纯净推送 注: 指过滤掉引用和转发, 且仅仅会覆盖掉自动推送模式'),
    authority: koishi_1.Schema.number()
        .default(2)
        .min(1)
        .description('设定指令的最低权限, 默认 2 级'),
    onlyMedia: koishi_1.Schema.boolean().default(false).description('是否只推送媒体动态'),
    bearer_key: koishi_1.Schema.string().default('').description('Bearer key'),
});
exports.logger = new koishi_1.Logger('KBot-twitter-dynamic');
async function apply(ctx, config) {
    const channels = await ctx.database.get('channel', {}, [
        'id',
        'guildId',
        'platform',
        'twitter',
    ]);
    const { edisonDir: kbotDir, twitterDir, twitterCookiePath, twitterTokenPath } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
    const fileNames = await fs.promises.readdir(kbotDir);
    if (!fileNames.includes('twitter')) {
        await fs.promises.mkdir(twitterDir, { recursive: true });
        await fs.promises.writeFile(twitterCookiePath, JSON.stringify({ cookies: '' }), { encoding: 'utf-8' });
        await fs.promises.writeFile(twitterTokenPath, JSON.stringify({ bearer_token: '' }), { encoding: 'utf-8' });
    }
    const list = channels
        .filter(channel => channel.twitter.dynamic)
        .reduce((acc, x) => {
        x.twitter.dynamic.forEach((notification) => {
            var _a;
            (acc[_a = notification.twitterRestId] || (acc[_a] = [])).push([x, notification]);
        });
        return acc;
    }, {});
    ctx
        .guild()
        .command('edison/twitter', 'Twitter 相关功能')
        .channelFields(['id', 'guildId', 'platform', 'twitter'])
        .before(checkDynamic)
        .usage(`最低权限: ${config.authority} 级`)
        .option('add', '-a <userId:string> 添加订阅, 请输入要添加的 twitter 博主的 id 名字(指 @后的字符串)', { authority: config.authority })
        .option('batch', '-b [...userId:string] 批量添加订阅, 请输入要添加的 twitter 博主的 id 名字(指 @后的字符串), 以逗号分隔', { authority: config.authority })
        .option('remove', '-r <userId:string> 移除订阅, 请输入要移除的 twitter 博主的 id 名字(指 @后的字符串)', { authority: config.authority })
        .option('search', '-s <userId:string> 查看最新动态, 请输入要查看动态的 twitter 博主的 id 名字(指 @后的字符串)', { authority: config.authority })
        .option('cookie', '-ck <cookie:string> 设置 twitter cookie, 请在登录 twitter 后使用浏览器的开发者工具获取', { authority: config.authority })
        .option('token', '-tk <token:string> 设置 twitter api token', { authority: config.authority })
        .option('list', '-l 展示当前订阅 twitter 博主列表', {
        authority: config.authority,
    })
        .example('使用方法: twitter -a xxxxx')
        .action(async ({ session, options }) => {
        if (Object.keys(options).length > 1)
            return '请不要同时使用多个参数';
        return (0, dynamic_strategy_1.dynamicStrategy)({ session, options }, list, ctx, config);
    });
    // 检查Cookie
    try {
        const cookieJson = await fs.promises.readFile(twitterCookiePath, { encoding: 'utf-8' });
        const cookie = JSON.parse(cookieJson);
        if (!cookie) {
            exports.logger.warn('未检测到 cookie, 请使用 twitter --ck <cookie> 设置');
        }
        else {
            ctx.http.config.headers['x-csrf-token'] = cookie.authCookie.ct0;
            ctx.http.config.headers.Cookie = cookie.cookieString;
        }
    }
    catch {
        exports.logger.warn('未检测到 cookie, 请使用 twitter --ck <cookie> 设置');
    }
    // 检查Token
    try {
        const tokenJson = await fs.promises.readFile(twitterTokenPath, { encoding: 'utf-8' });
        const token = JSON.parse(tokenJson);
        if (!token) {
            exports.logger.warn('未检测到 token, 请使用 twitter --tk <token> 设置');
        }
        else {
            ctx.http.config.headers['Authorization'] = `Bearer ${token['bearer_token']}`;
            config.bearer_key = token['bearer_token'];
        }
    }
    catch {
        exports.logger.warn('未检测到 token, 请使用 twitter --tk <token> 设置');
    }
    exports.logger.info(`Twitter监听间隔 ${config.interval * 1000}`);
    const generator = (0, listen_1.listen)(list, utils_1.getTwitterTweets, ctx, config);
    ctx.setInterval(async () => {
        await generator.next();
    }, config.interval * 1000);
}
exports.apply = apply;
function checkDynamic({ session }) {
    var _a;
    (_a = session.channel.twitter).dynamic || (_a.dynamic = []);
}