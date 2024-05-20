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
exports.apply = exports.Config = void 0;
const koishi_1 = require("koishi");
const dynamic = __importStar(require("./dynamic"));
exports.Config = koishi_1.Schema.object({
    dynamic: dynamic.Config.description('动态监听 (使用 dynamic 指令管理监听对象)'),
    quester: koishi_1.Quester.Config.description('twitter 请求配置'),
});
function apply(context, config) {
    context.guild().command('edison/twitter', 'Twitter 相关功能');
    context.model.extend('channel', {
        twitter: {
            type: 'json',
            initial: {},
        },
    });
    const ctx = context.isolate('http');
    const bearer_token = config.dynamic.bearer_key;
    ctx.http = context.http.extend({
        headers: {
            'User-Agent': 'PostmanRuntime/7.31.0',
            'Authorization': `Bearer ${bearer_token}`,
            ...config.quester.headers,
        },
        ...config.quester,
    });
    ctx.plugin(dynamic, config.dynamic);
}
exports.apply = apply;
