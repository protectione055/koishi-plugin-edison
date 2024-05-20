"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicStrategy = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-03 13:57:11
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-03 10:31:19
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\dynamic\dynamic.strategy.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const koishi_1 = require("koishi");
const utils_1 = require("../utils");
const common_1 = require("./common");
const _1 = require(".");
const dynamicStrategies = {
    add: common_1.twitterAdd,
    remove: common_1.twitterRemove,
    list: common_1.twitterList,
    search: common_1.twitterSearch,
    batch: common_1.twitterBatch,
    cookie: common_1.twitterCookie,
    token: common_1.twitterToken,
};
async function dynamicStrategy({ session, options, }, list, ctx, config) {
    try {
        const strategyName = Object.keys(options).find(key => options[key]);
        if (Object.keys(dynamicStrategies).includes(strategyName)) {
            let restId, twitterName, twitterId;
            if (!['list', 'batch', 'cookie', 'token'].includes(strategyName)) {
                twitterId = options[strategyName];
                [restId, twitterName] = await (0, utils_1.getTwitterRestId)(twitterId, ctx.http, _1.logger);
                if (!restId)
                    return '未获取到对应 twitter 博主 ID 信息, 请使用 twitter --ck <cookie> 设置 cookie';
            }
            else if (strategyName === 'batch') {
                await session.send('因 twitter 限制, 批量添加速度较慢, 每个用户添加间隔为 2s');
                restId = [];
                twitterName = [];
                twitterId = session.content
                    .split(' ')
                    .slice(2)
                    .join(' ')
                    .replace(/，/ig, ',')
                    .split(',');
                for (const id of twitterId) {
                    const [id_, name] = await (0, utils_1.getTwitterRestId)(id.trim(), ctx.http, _1.logger);
                    if (id_ && name) {
                        restId.push(id_);
                        twitterName.push(name);
                    }
                    await (0, koishi_1.sleep)(1000);
                }
                if (!restId.length)
                    return '未获取到对应 twitter 博主 ID 信息, 请使用 twitter --ck <cookie> 设置 cookie';
            }
            return dynamicStrategies[strategyName]?.({ session, options }, { twitterId, twitterName, twitterRestId: restId }, list, ctx, config);
        }
    }
    catch (err) {
        return err.message || err;
    }
}
exports.dynamicStrategy = dynamicStrategy;
