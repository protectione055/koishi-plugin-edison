"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.logger = exports.Config = void 0;
const koishi_1 = require("koishi");
const render_1 = require("./render");
const utils_1 = require("./utils");
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const { version: pVersion } = require('../../../package.json');
exports.Config = koishi_1.Schema.object({
    useModel: koishi_1.Schema.union([
        koishi_1.Schema.const('neko').description('猫羽雫'),
        koishi_1.Schema.object({
            sort: koishi_1.Schema.union(['random', 'iw233', 'top', 'yin', 'cat', 'xing', 'mp', 'pc']).default('mp').description('请前往 https://mirlkoi.ifast3.vipnps.vip/API/index.php 来选择你想要的 sort'),
        }).description('随机图片'),
    ]).default('neko').description('请选择你想要的模式'),
    botName: koishi_1.Schema.string().default('EDISON').description('在自检图片中显示的名称(如果不填写则显示机器人的昵称, 不要太长哦)'),
});
exports.logger = new koishi_1.Logger('Edison-status');
async function apply(ctx, config) {
    ctx.command('edison/body', '检查机器人状态', {
        checkArgCount: true,
        showWarning: false,
    }).shortcut('自检', { fuzzy: false })
        .action(async ({ session }) => {
        if (!ctx.puppeteer)
            return '未安装/启用 puppeteer 插件，无法使用图片渲染';
        const systemInfo = await (0, utils_1.getSystemInfo)(config.botName || session.bot.userId, koishi_1.version, pVersion, ctx.registry.size);
        if (config?.useModel === 'neko')
            return await (0, render_1.renderHtml)(ctx, systemInfo);
        else
            return await (0, render_1.renderRandom)(ctx, config.useModel.sort, systemInfo.random, session.bot.selfId);
    });
}
exports.apply = apply;
