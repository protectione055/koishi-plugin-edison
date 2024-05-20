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
exports.getTwitterToken = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-27 13:24:23
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-11 11:28:38
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\utils\reGetToken.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const fs = __importStar(require("node:fs"));
const config_1 = __importDefault(require("../../../config"));
async function getTwitterToken(ctx, logger) {
    let page, cookie, gtCookie;
    try {
        const { twitterCookiePath } = config_1.default.getInstance(ctx.baseDir).getGeneratePathData();
        logger.info('token 获取中...');
        page = await ctx.puppeteer.page();
        // 监听 request 事件
        const onRequest = (request) => {
            const guestToken = request.headers().Cookie;
            if (guestToken !== undefined) {
                gtCookie = guestToken;
                page.removeAllListeners('request');
            }
        };
        page.on('request', onRequest);
        await page.goto('https://twitter.com/');
        await page.waitForNetworkIdle();
        const cookieRegex = /([^=;\s]+)=([^=;\s]*)/g;
        if (!cookieRegex.test(gtCookie) && !gtCookie)
            throw new Error('token 获取失败, 请检查是否在浏览器中正确登录 Twitter 账户');
        const cookieObject = {
            ct0: '',
            auth_token: '',
        };
        gtCookie.match(cookieRegex)?.forEach((cookie) => {
            const [key, value] = cookie.split('=');
            if (['ct0', 'auth_token'].includes(key))
                cookieObject[key] = value;
        });
        await fs.promises.writeFile(twitterCookiePath, JSON.stringify({ cookieString: gtCookie, authCookie: { ...cookieObject } }));
        ctx.http.config.headers['x-csrf-token'] = cookieObject.ct0;
        ctx.http.config.headers.Cookie = gtCookie;
        cookie = { cookieString: gtCookie, authCookie: { ...cookieObject } };
        logger.info('token 获取成功: ', cookieObject);
    }
    catch (error) {
        logger.error('token 获取失败: ', error.message);
        return { cookieString: '', authCookie: {} };
    }
    finally {
        page?.close();
    }
    return cookie;
}
exports.getTwitterToken = getTwitterToken;
