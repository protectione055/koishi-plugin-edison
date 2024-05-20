"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTSApiEnum = exports.KbitrateEnum = exports.RoleEnum = exports.StyleEnum = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-04-07 13:01:39
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-04-07 13:29:33
 * @FilePath: \KBot-App\plugins\kbot\src\basic\tts\enum.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
var StyleEnum;
(function (StyleEnum) {
    StyleEnum["affectionate"] = "\u4EE5\u8F83\u9AD8\u7684\u97F3\u8C03\u548C\u97F3\u91CF\u8868\u8FBE\u6E29\u6696\u800C\u4EB2\u5207\u7684\u8BED\u6C14";
    StyleEnum["angry"] = "\u8868\u8FBE\u751F\u6C14\u548C\u538C\u6076\u7684\u8BED\u6C14";
    StyleEnum["assistant"] = "\u70ED\u60C5\u800C\u8F7B\u677E\u7684\u8BED\u6C14";
    StyleEnum["calm"] = "\u4EE5\u6C89\u7740\u51B7\u9759\u7684\u6001\u5EA6\u8BF4\u8BDD";
    StyleEnum["chat"] = "\u8868\u8FBE\u8F7B\u677E\u968F\u610F\u7684\u8BED\u6C14";
    StyleEnum["cheerful"] = "\u8868\u8FBE\u79EF\u6781\u6109\u5FEB\u7684\u8BED\u6C14";
    StyleEnum["customerservice"] = "\u53CB\u597D\u70ED\u60C5\u7684\u8BED\u6C14";
    StyleEnum["depressed"] = "\u8C03\u4F4E\u97F3\u8C03\u548C\u97F3\u91CF\u6765\u8868\u8FBE\u5FE7\u90C1\u3001\u6CAE\u4E27\u7684\u8BED\u6C14";
    StyleEnum["disgruntled"] = "\u8868\u8FBE\u8F7B\u8511\u548C\u62B1\u6028\u7684\u8BED\u6C14";
    StyleEnum["embarrassed"] = "\u5728\u8BF4\u8BDD\u8005\u611F\u5230\u4E0D\u8212\u9002\u65F6\u8868\u8FBE\u4E0D\u786E\u5B9A\u3001\u72B9\u8C6B\u7684\u8BED\u6C14";
    StyleEnum["empathetic"] = "\u8868\u8FBE\u5173\u5FC3\u548C\u7406\u89E3";
    StyleEnum["envious"] = "\u5F53\u4F60\u6E34\u671B\u522B\u4EBA\u62E5\u6709\u7684\u4E1C\u897F\u65F6\uFF0C\u8868\u8FBE\u4E00\u79CD\u94A6\u4F69\u7684\u8BED\u6C14";
    StyleEnum["fearful"] = "\u4EE5\u8F83\u9AD8\u7684\u97F3\u8C03\u3001\u8F83\u9AD8\u7684\u97F3\u91CF\u548C\u8F83\u5FEB\u7684\u8BED\u901F\u6765\u8868\u8FBE\u6050\u60E7\u3001\u7D27\u5F20\u7684\u8BED\u6C14";
    StyleEnum["gentle"] = "\u4EE5\u8F83\u4F4E\u7684\u97F3\u8C03\u548C\u97F3\u91CF\u8868\u8FBE\u6E29\u548C\u3001\u793C\u8C8C\u548C\u6109\u5FEB\u7684\u8BED\u6C14";
    StyleEnum["lyrical"] = "\u4EE5\u4F18\u7F8E\u53C8\u5E26\u611F\u4F24\u7684\u65B9\u5F0F\u8868\u8FBE\u60C5\u611F";
    StyleEnum["narration-professional"] = "\u4EE5\u4E13\u4E1A\u3001\u5BA2\u89C2\u7684\u8BED\u6C14\u6717\u8BFB\u5185\u5BB9";
    StyleEnum["narration-relaxed"] = "\u4E3A\u5185\u5BB9\u9605\u8BFB\u8868\u8FBE\u4E00\u79CD\u8212\u7F13\u800C\u60A6\u8033\u7684\u8BED\u6C14";
    StyleEnum["newscast"] = "\u4EE5\u6B63\u5F0F\u4E13\u4E1A\u7684\u8BED\u6C14\u53D9\u8FF0\u65B0\u95FB";
    StyleEnum["newscast-casual"] = "\u4EE5\u901A\u7528\u3001\u968F\u610F\u7684\u8BED\u6C14\u53D1\u5E03\u4E00\u822C\u65B0\u95FB";
    StyleEnum["newscast-formal"] = "\u4EE5\u6B63\u5F0F\u3001\u81EA\u4FE1\u548C\u6743\u5A01\u7684\u8BED\u6C14\u53D1\u5E03\u65B0\u95FB";
    StyleEnum["sad"] = "\u8868\u8FBE\u60B2\u4F24\u8BED\u6C14";
    StyleEnum["serious"] = "\u8868\u8FBE\u4E25\u8083\u548C\u547D\u4EE4\u7684\u8BED\u6C14";
    StyleEnum["shouting"] = "\u5C31\u50CF\u4ECE\u9065\u8FDC\u7684\u5730\u65B9\u8BF4\u8BDD\u6216\u5728\u5916\u9762\u8BF4\u8BDD\uFF0C\u4F46\u80FD\u8BA9\u81EA\u5DF1\u6E05\u695A\u5730\u542C\u5230";
    StyleEnum["advertisement-upbeat"] = "\u7528\u5174\u594B\u548C\u7CBE\u529B\u5145\u6C9B\u7684\u8BED\u6C14\u63A8\u5E7F\u4EA7\u54C1\u6216\u670D\u52A1";
    StyleEnum["sports-commentary"] = "\u7528\u8F7B\u677E\u6709\u8DA3\u7684\u8BED\u6C14\u64AD\u62A5\u4F53\u80B2\u8D5B\u4E8B";
    StyleEnum["sports-commentary-excited"] = "\u7528\u5FEB\u901F\u4E14\u5145\u6EE1\u6D3B\u529B\u7684\u8BED\u6C14\u64AD\u62A5\u4F53\u80B2\u8D5B\u4E8B\u7CBE\u5F69\u77AC\u95F4";
    StyleEnum["whispering"] = "\u8BF4\u8BDD\u975E\u5E38\u67D4\u548C\uFF0C\u53D1\u51FA\u7684\u58F0\u97F3\u5C0F\u4E14\u6E29\u67D4";
    StyleEnum["terrified"] = "\u8868\u8FBE\u4E00\u79CD\u975E\u5E38\u5BB3\u6015\u7684\u8BED\u6C14\uFF0C\u8BED\u901F\u5FEB\u4E14\u58F0\u97F3\u98A4\u6296\u3002 \u542C\u8D77\u6765\u8BF4\u8BDD\u4EBA\u5904\u4E8E\u4E0D\u7A33\u5B9A\u7684\u75AF\u72C2\u72B6\u6001";
    StyleEnum["unfriendly"] = "\u8868\u8FBE\u4E00\u79CD\u51B7\u6DE1\u65E0\u60C5\u7684\u8BED\u6C14";
})(StyleEnum || (exports.StyleEnum = StyleEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["Girl"] = "\u6A21\u62DF\u5973\u5B69";
    RoleEnum["Boy"] = "\u6A21\u62DF\u7537\u5B69";
    RoleEnum["YoungAdultFemale"] = "\u6A21\u62DF\u5E74\u8F7B\u6210\u5E74\u5973\u6027";
    RoleEnum["YoungAdultMale"] = "\u6A21\u62DF\u5E74\u8F7B\u6210\u5E74\u7537\u6027";
    RoleEnum["OlderAdultFemale"] = "\u6A21\u62DF\u5E74\u957F\u7684\u6210\u5E74\u5973\u6027";
    RoleEnum["OlderAdultMale"] = "\u6A21\u62DF\u5E74\u957F\u7684\u6210\u5E74\u7537\u6027";
    RoleEnum["SeniorFemale"] = "\u6A21\u62DF\u8001\u5E74\u5973\u6027";
    RoleEnum["SeniorMale"] = "\u6A21\u62DF\u8001\u5E74\u7537\u6027";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var KbitrateEnum;
(function (KbitrateEnum) {
    KbitrateEnum["16khz-32kbitrate(mp3)"] = "audio-16khz-32kbitrate-mono-mp3";
    KbitrateEnum["16khz-128kbitrate(mp3)"] = "audio-16khz-128kbitrate-mono-mp3";
    KbitrateEnum["24khz-160kbitrate(mp3)"] = "audio-24khz-160kbitrate-mono-mp3";
    KbitrateEnum["48khz-192kbitrate(mp3)"] = "audio-48khz-192kbitrate-mono-mp3";
    KbitrateEnum["16khz-16bit-mono-pcm(wav)"] = "riff-16khz-16bit-mono-pcm";
    KbitrateEnum["24khz-16bit-mono-pcm(wav)"] = "riff-24khz-16bit-mono-pcm";
    KbitrateEnum["48khz-16bit-mono-pcm(wav)"] = "riff-48khz-16bit-mono-pcm";
})(KbitrateEnum || (exports.KbitrateEnum = KbitrateEnum = {}));
var TTSApiEnum;
(function (TTSApiEnum) {
    TTSApiEnum["SpeekList"] = "https://www.text-to-speech.cn/getSpeekList.php";
    TTSApiEnum["Speek"] = "https://www.text-to-speech.cn/getSpeek.php";
})(TTSApiEnum || (exports.TTSApiEnum = TTSApiEnum = {}));
