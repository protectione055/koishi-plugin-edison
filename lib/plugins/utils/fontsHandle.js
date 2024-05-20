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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFont = exports.getFontsList = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-05 23:11:45
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-11 17:54:47
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\utils\fontsHandle.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
/* eslint-disable n/prefer-global/buffer */
const fs = __importStar(require("node:fs"));
async function getFontsList(path, logger) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        const needLoadFontList = [];
        const fileNames = await fs.promises.readdir(path);
        await Promise.all(fileNames.map(async (fontFileName) => {
            try {
                const fileBuffer = await fs.promises.readFile(`${path}/${fontFileName}`, 'binary');
                needLoadFontList.push({
                    fontFamily: `${fontFileName.split('.').join(' ')}`,
                    fontUrl: `data:application/font-${fontFileName.split('.')[1]};base64,${Buffer.from(fileBuffer, 'binary').toString('base64')}`,
                });
            }
            catch (err) {
                logger.error(`字体 ${fontFileName} 加载失败`, err);
            }
        }));
        resolve(needLoadFontList);
    });
}
exports.getFontsList = getFontsList;
async function loadFont(needLoadFontList) {
    const fontFace = needLoadFontList.reduce((defaultString, fontObject) => {
        return (`${defaultString}@font-face { font-family: ${fontObject.fontFamily};src: url('${fontObject.fontUrl}'); }`);
    }, '');
    let needLoadFont = needLoadFontList.reduce((defaultString, fontObject) => `${defaultString + fontObject.fontFamily},`, '');
    needLoadFont = `${needLoadFont}Microsoft YaHei, Helvetica Neue ,Helvetica, Arial, sans-serif`;
    return [fontFace, needLoadFont];
}
exports.loadFont = loadFont;
