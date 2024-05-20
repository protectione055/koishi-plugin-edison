"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderRandom = exports.renderHtml = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-03-13 17:14:23
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-24 12:00:00
 * @FilePath: \KBot-App\plugins\kbot\src\basic\status\render\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const node_url_1 = require("node:url");
const node_path_1 = require("node:path");
const koishi_1 = require("koishi");
// import { writeBlobToFile } from '../utils'
const __1 = require("..");
const config_1 = __importDefault(require("../../../config"));
const utils_1 = require("../../../plugins/utils");
async function renderHtml(ctx, systemInfo) {
    let page;
    try {
        const { statusFontsDir } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
        let needLoadFontList = await (0, utils_1.getFontsList)(statusFontsDir, __1.logger);
        needLoadFontList = needLoadFontList.filter(font => ['Gugi-Regular ttf', 'HachiMaruPop-Regular ttf'].includes(font.fontFamily));
        page = await ctx.puppeteer.page();
        await page.setViewport({ width: 1920 * 2, height: 1080 * 2 });
        await page.goto(`${(0, node_url_1.pathToFileURL)((0, node_path_1.resolve)(__dirname, '../neko/template.html'))}`);
        await page.evaluate(`action(${JSON.stringify(systemInfo)})`);
        if (needLoadFontList.length > 0)
            await page.evaluate(`setFont(${JSON.stringify(needLoadFontList)})`);
        await page.waitForNetworkIdle();
        const element = await page.$('#background-page');
        await page.evaluate(() => document.fonts.ready);
        return (koishi_1.segment.image(await element.screenshot({
            encoding: 'binary',
        }), 'image/png'));
    }
    catch (e) {
        __1.logger.error('puppeteer 渲染失败: ', e);
        return `渲染失败${e.message}`;
    }
    finally {
        page?.close();
    }
}
exports.renderHtml = renderHtml;
async function renderRandom(ctx, sort, systemInfo, botUid) {
    return ctx.http.axios({
        method: 'get',
        url: `https://iw233.cn/api.php?sort=${sort}&type=json`,
        headers: {
            referer: 'https://weibo.com/',
        },
    }).then((res) => {
        return ctx.http.axios({
            method: 'get',
            url: res.data.pic[0],
            responseType: 'arraybuffer',
            headers: {
                referer: 'https://weibo.com/',
            },
        }).then(async (resp) => {
            // eslint-disable-next-line n/prefer-global/buffer
            const imageBase64 = Buffer.from(resp.data, 'binary').toString('base64');
            let page;
            try {
                const { statusFontsDir } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
                let needLoadFontList = await (0, utils_1.getFontsList)(statusFontsDir, __1.logger);
                needLoadFontList = needLoadFontList.filter(font => ['Poppins-Regular ttf', 'NotoSansSC-Regular otf'].includes(font.fontFamily));
                page = await ctx.puppeteer.page();
                await page.setViewport({ width: 1920 * 2, height: 1080 * 2 });
                await page.goto(`${(0, node_url_1.pathToFileURL)((0, node_path_1.resolve)(__dirname, '../random/template.html'))}`);
                await page.evaluate(`action(${JSON.stringify(systemInfo)}, '${imageBase64}', '${botUid}')`);
                if (needLoadFontList.length > 0)
                    await page.evaluate(`setFont(${JSON.stringify(needLoadFontList)})`);
                await page.waitForNetworkIdle();
                const element = await page.$('#app');
                await page.evaluate(() => document.fonts.ready);
                return (koishi_1.segment.image(await element.screenshot({
                    encoding: 'binary',
                }), 'image/png'));
            }
            catch (e) {
                __1.logger.error('puppeteer 渲染失败: ', e);
                return `puppeteer 渲染失败${e.message}`;
            }
            finally {
                page?.close();
            }
        });
    }).catch((err) => {
        __1.logger.error('render random error:', err);
        if (['ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ECONNABORTED', 'read ECONNRESET'].includes(err.code))
            return '渲染失败: 请求超时, 网络错误';
        return `渲染失败: ${err.message}`;
    });
}
exports.renderRandom = renderRandom;
