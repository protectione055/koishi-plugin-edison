"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Kabuda-czh
 * @Date: 2023-04-06 11:03:23
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-24 11:51:57
 * @FilePath: \KBot-App\plugins\kbot\src\config\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const node_path_1 = require("node:path");
class GeneratePath {
    constructor(path) {
        // baseDir
        const baseDir = (0, node_path_1.resolve)(__dirname, path);
        // edison-data
        const edisonDir = (0, node_path_1.resolve)(baseDir, 'edison-data');
        // fonts
        const fontsDir = '';
        const renderFontsDir = '';
        const statusFontsDir = '';
        // images
        const imagesDir = '';
        const statusImagesDir = '';
        const tarotImagesDir = '';
        // bilibili
        const bilibiliDir = (0, node_path_1.resolve)(edisonDir, 'bilibili');
        const bilibiliCookiePath = (0, node_path_1.resolve)(bilibiliDir, 'cookie.json');
        const bilibiliVupPath = (0, node_path_1.resolve)(bilibiliDir, 'vup.json');
        // twitter
        const twitterDir = (0, node_path_1.resolve)(edisonDir, 'twitter');
        const twitterCookiePath = (0, node_path_1.resolve)(twitterDir, 'cookie.json');
        const twitterTokenPath = (0, node_path_1.resolve)(twitterDir, 'token.json');
        this.generatePathData = {
            baseDir,
            edisonDir: edisonDir,
            fontsDir,
            renderFontsDir,
            statusFontsDir,
            imagesDir,
            statusImagesDir,
            tarotImagesDir,
            bilibiliDir,
            bilibiliCookiePath,
            bilibiliVupPath,
            twitterDir,
            twitterCookiePath,
            twitterTokenPath,
        };
    }
    static getInstance(path) {
        if (!this.instance)
            this.instance = new GeneratePath(path);
        return this.instance;
    }
    setFontsDir(fontsDir) {
        this.generatePathData.fontsDir = fontsDir;
        this.generatePathData.renderFontsDir = (0, node_path_1.resolve)(fontsDir, 'render');
        this.generatePathData.statusFontsDir = (0, node_path_1.resolve)(fontsDir, 'status');
    }
    setImagesDir(imagesDir) {
        this.generatePathData.imagesDir = imagesDir;
        this.generatePathData.statusImagesDir = (0, node_path_1.resolve)(imagesDir, 'status');
        this.generatePathData.tarotImagesDir = (0, node_path_1.resolve)(imagesDir, 'tarot');
    }
    getGeneratePathData() {
        return this.generatePathData;
    }
}
exports.default = GeneratePath;
