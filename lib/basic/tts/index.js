"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.logger = exports.Config = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-01-29 14:28:53
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-04-25 11:43:06
 * @FilePath: \KBot-App\plugins\kbot\src\basic\tts\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const koishi_1 = require("koishi");
const enum_1 = require("./enum");
exports.Config = koishi_1.Schema.object({});
exports.logger = new koishi_1.Logger('KBot-tts');
async function apply(ctx, _config) {
    ctx.command('kbot/tts <text:string>', '文字转语音')
        .option('language', '-l <language:string> 语言')
        .option('voice', '-v <voice:string> 语音')
        .option('role', '-r <role:string> 模仿')
        .option('style', '-s <style:string> 感情')
        .option('kbitrate', '-k <kbitrate:string> 比特率')
        .option('silence', '-i <silence:number> 静音')
        .option('styledegree', '-d <styledegree:string> 感情强度')
        .option('rate', '-t <rate:number> 语速 (-100 ~ 200)')
        .option('pitch', '-p <pitch:number> 音调 (-50 ~ 50)')
        .action(async ({ options }, text) => {
        const params = {
            language: '中文（普通话，简体）',
            voice: 'zh-CN-XiaoxiaoNeural',
            text,
            role: '0',
            style: '0',
            styledegree: '1',
            rate: 0,
            pitch: 0,
            kbitrate: 'audio-16khz-32kbitrate-mono-mp3',
            silence: '',
        };
        Object.assign(params, options);
        const formData = Object.keys(params)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
            .join('&');
        const { data } = await ctx.http.axios(enum_1.TTSApiEnum.Speek, {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return koishi_1.segment.audio(data.download);
    });
}
exports.apply = apply;
