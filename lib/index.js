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
exports.apply = exports.using = exports.logger = exports.Config = exports.usage = exports.name = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-01-29 14:28:53
 * @LastEditors: Kabuda-czh 634469564@qq.com
 * @LastEditTime: 2023-08-30 20:46:06
 * @FilePath: \KBot-App\plugins\kbot\src\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const node_fs_1 = __importDefault(require("node:fs"));
const koishi_1 = require("koishi");
const botBasic = __importStar(require("./basic"));
const twitterPlugin = __importStar(require("./plugins/twitter"));
// import * as valorantPlugin from './plugins/valorant'
const config_1 = __importDefault(require("./config"));
const utils_1 = require("./plugins/utils");
exports.name = 'edison';
exports.usage = `
<style>
html, body {
  width: 100%;
  height: 100%;
  display: flex;
  background: #000;
}
svg {
  width: 100%;
  height: 100px;
  margin: auto;
}
svg text {
  text-transform: uppercase;
  animation: stroke 5s infinite alternate;
  letter-spacing: 10px;
  font-size: 90px;
}
@keyframes stroke {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 0.8;
  }
  50% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 1.2;
  }
  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(54, 95, 160, 1);
    stroke-width: 1.5;
  }
  90%,
  100% {
    fill: rgba(72, 138, 204, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

</style>
<svg viewBox="400 0 400 200">
  <text x="0" y="70%"> Koishi-Plugin-edison </text>
</svg>

# KBot v1.1.2 更新日志

## Note

- 修复 \`guildmanage\` 插件问题
- 修复 \`bilibili\` 插件问题
- 修复 \`twitter\` 插件问题
- 重构文件路径方法
- 更新 \`download\` 的路径下载
- 更新插件首页显示小动画, 以及部分内容

## Bug Fix

- 修复 \`guildmanage\` 因为 ref 绑定错误导致对应按钮无法打开
- 修复 \`guildmanage\` 监听 \`message\` 问题
- 修复文件路径, 使用单例模式来创建对应路径, 以及增加判断 \`edison\` 文件夹
- 修复 \`bilibili\` 增加在 \`pptr\` 中, 跳转到网页后使用自带 \`cookie\` 的功能
- 修复 \`bilibili\` 对于 \`vup\` 以及 \`danmu\` 功能, 在关闭图片功能中, 无法正确使用的情况, 增加了单独使用图片的方法
- 在 \`bilibili\` 中, 增加 \`try-catch\` 对于渲染动态的报错捕获

## Feature

- 更改 \`download\` 文件下载的对应文件路径包
- 更新插件配置页面的小动画以及部分内容

详细更新日志请看: [Release](https://github.com/Kabuda-czh/koishi-plugin-edison/releases/tag/1.1.2)

## 如果你觉得这个插件还不错, 可以考虑支持一下我
## [爱发电](https://afdian.net/a/kbd-dev)
`;
function pluginLoad(schema) {
    return koishi_1.Schema.intersect([
        koishi_1.Schema.object({
            enabled: koishi_1.Schema.boolean().default(false).description('是否启用插件'),
        }),
        koishi_1.Schema.union([
            koishi_1.Schema.object({
                enabled: koishi_1.Schema.const(true).required(),
                ...schema.dict,
            }),
            koishi_1.Schema.object({
                enabled: koishi_1.Schema.const(false),
            }),
        ]),
    ]);
}
exports.Config = koishi_1.Schema.object({
    superAdminQQ: koishi_1.Schema.array(String).description('超级管理员QQ号 (必填)'),
    KBotBasic: botBasic.Config,
    KBotTwitter: pluginLoad(twitterPlugin.Config).description('Twitter 动态推送 (必须要 puppeteer)'),
});
exports.logger = new koishi_1.Logger('Edison');
exports.using = ['console', 'database', 'downloads'];
async function apply(ctx, config) {
    if (!config.superAdminQQ || config.superAdminQQ.length === 0) {
        exports.logger.error('未设置超级管理员QQ号');
    }
    else {
        const generatePath = config_1.default.getInstance(ctx.baseDir);
        const { edisonDir: kbotDir } = generatePath.getGeneratePathData();
        let createFlag = false;
        try {
            await node_fs_1.default.promises.readdir(kbotDir);
        }
        catch (e) {
            exports.logger.error('未找到 edison-data 文件夹, 正在创建');
            await node_fs_1.default.promises.mkdir(kbotDir);
            createFlag = true;
        }
        if (!createFlag && !node_fs_1.default.existsSync(kbotDir))
            await node_fs_1.default.promises.mkdir(kbotDir);
        const fontPath = await (0, utils_1.downloadAndMoveFiles)('task1', 'kbot-fonts', [
            'npm://koishi-plugin-kbot-assets',
            'npm://koishi-plugin-kbot-assets?registry=https://registry.npmmirror.com',
        ], ctx);
        generatePath.setFontsDir(fontPath);
        const imagePath = await (0, utils_1.downloadAndMoveFiles)('task2', 'kbot-images', [
            'npm://koishi-plugin-kbot-assets',
            'npm://koishi-plugin-kbot-assets?registry=https://registry.npmmirror.com',
        ], ctx);
        generatePath.setImagesDir(imagePath);
        ctx.bots.forEach(async (bot) => {
            if (![2 /* Status.CONNECT */, 1 /* Status.ONLINE */].includes(bot.status)
                || bot.platform === 'qqguild')
                return;
            config.superAdminQQ.forEach(async (qq) => {
                await ctx.database.getUser(bot.platform, qq).then((user) => {
                    try {
                        if (user && user?.authority < 5) {
                            ctx.database.setUser(bot.platform, qq, {
                                authority: 5,
                            });
                            exports.logger.success(`已将QQ号为 ${qq} 的用户权限设置为 5 级`);
                        }
                        else if (!user) {
                            ctx.database.createUser(bot.platform, qq, {
                                authority: 5,
                            });
                            exports.logger.success(`已成功创建QQ号为 ${qq} 的用户, 并赋予权限 5 级`);
                        }
                    }
                    catch (err) {
                        exports.logger.error(`设置QQ号为 ${qq} 的用户权限时出错: ${err}`);
                    }
                });
            });
        });
        ctx.command('edison', 'edison 相关功能');
        ctx.on('friend-request', async (session) => {
            await ctx.database.getUser(session.platform, session.userId).then(async (user) => {
                if (user.authority >= 3)
                    await session.bot.handleFriendRequest(session.messageId, true);
            });
        });
        ctx.on('guild-request', async (session) => {
            await ctx.database.getUser(session.platform, session.userId).then(async (user) => {
                if (user.authority >= 3)
                    await session.bot.handleGuildRequest(session.messageId, true);
            });
        });
        ctx.plugin(botBasic, config.KBotBasic);
        ctx.plugin(twitterPlugin, config.KBotTwitter);
        exports.logger.success('Edison 内置插件加载完毕');
    }
}
exports.apply = apply;