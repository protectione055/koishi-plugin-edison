"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const render_1 = require("./render");
const _1 = require(".");
async function* listen(list, request, ctx, config) {
    while (true) {
        const entries = Object.entries(list);
        if (entries.length === 0) {
            yield;
            continue;
        }
        _1.logger.info(`开始轮询 ${entries.length} 个用户`);
        for (const [restId, notifications] of entries) {
            if (notifications.length === 0)
                continue;
            const time = notifications[0][1].lastUpdatedId;
            try {
                const items = await request(restId, ctx, _1.logger, config.usePure, true);
                const user_info = items.user_info;
                if (items.tweets.length === 0)
                    continue;
                // 记录最新的twitterId
                if (!notifications[0]?.[1].lastUpdatedId) {
                    notifications.forEach(([, notification]) => (notification.lastUpdatedId
                        = items.tweets[0].id));
                    continue;
                }
                const neo = items.tweets.filter(item => { return item.id > time; }) || [];
                if (neo.length !== 0) {
                    const rendered = await Promise.all(neo.map(item => (0, render_1.renderFunction)(ctx, item, user_info, config)));
                    rendered.forEach((text, index) => {
                        notifications.forEach(([channel, notification]) => {
                            notification.lastUpdatedId = neo[index].id;
                            ctx.bots[notification.botId]?.sendMessage(channel.id, text, channel.guildId);
                        });
                    });
                }
            }
            catch (e) {
                _1.logger.error(`轮询 Error: ${e}`);
            }
            yield;
        }
    }
}
exports.listen = listen;
