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
exports.apply = exports.logger = exports.Config = void 0;
const koishi_1 = require("koishi");
const statusPlugin = __importStar(require("./status"));
const ttsPlugin = __importStar(require("./tts"));
exports.Config = koishi_1.Schema.object({
    checkBody: koishi_1.Schema.intersect([
        koishi_1.Schema.object({
            enabled: koishi_1.Schema.boolean().default(false).description('是否开启自带的 status, 等同于插件 `status-pro` (需要 puppeteer)'),
        }),
        koishi_1.Schema.union([
            koishi_1.Schema.object({
                enabled: koishi_1.Schema.const(true).required(),
                ...statusPlugin.Config.dict,
            }),
            koishi_1.Schema.object({
                enabled: koishi_1.Schema.const(false),
            }),
        ]),
    ]),
    tts: koishi_1.Schema.boolean().default(false).description('是否开启文字转语音, API 来源于 https://www.text-to-speech.cn/'),
});
exports.logger = new koishi_1.Logger('Edison-basic');
async function apply(ctx, config) {
    if (config.checkBody.enabled)
        ctx.plugin(statusPlugin, config.checkBody);
    if (config.tts)
        ctx.plugin(ttsPlugin);
}
exports.apply = apply;
