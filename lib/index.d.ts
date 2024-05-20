import type { Context } from 'koishi';
import { Logger, Schema } from 'koishi';
import * as botBasic from './basic';
import * as twitterPlugin from './plugins/twitter';
export declare const name = "edison";
export declare const usage = "\n<style>\nhtml, body {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  background: #000;\n}\nsvg {\n  width: 100%;\n  height: 100px;\n  margin: auto;\n}\nsvg text {\n  text-transform: uppercase;\n  animation: stroke 5s infinite alternate;\n  letter-spacing: 10px;\n  font-size: 90px;\n}\n@keyframes stroke {\n  0% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-dashoffset: 25%;\n    stroke-dasharray: 0 50%;\n    stroke-width: 0.8;\n  }\n  50% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-width: 1.2;\n  }\n  70% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-width: 1.5;\n  }\n  90%,\n  100% {\n    fill: rgba(72, 138, 204, 1);\n    stroke: rgba(54, 95, 160, 0);\n    stroke-dashoffset: -25%;\n    stroke-dasharray: 50% 0;\n    stroke-width: 0;\n  }\n}\n\n</style>\n<svg viewBox=\"400 0 400 200\">\n  <text x=\"0\" y=\"70%\"> Koishi-Plugin-edison </text>\n</svg>\n\n# KBot v1.1.2 \u66F4\u65B0\u65E5\u5FD7\n\n## Note\n\n- \u4FEE\u590D `guildmanage` \u63D2\u4EF6\u95EE\u9898\n- \u4FEE\u590D `bilibili` \u63D2\u4EF6\u95EE\u9898\n- \u4FEE\u590D `twitter` \u63D2\u4EF6\u95EE\u9898\n- \u91CD\u6784\u6587\u4EF6\u8DEF\u5F84\u65B9\u6CD5\n- \u66F4\u65B0 `download` \u7684\u8DEF\u5F84\u4E0B\u8F7D\n- \u66F4\u65B0\u63D2\u4EF6\u9996\u9875\u663E\u793A\u5C0F\u52A8\u753B, \u4EE5\u53CA\u90E8\u5206\u5185\u5BB9\n\n## Bug Fix\n\n- \u4FEE\u590D `guildmanage` \u56E0\u4E3A ref \u7ED1\u5B9A\u9519\u8BEF\u5BFC\u81F4\u5BF9\u5E94\u6309\u94AE\u65E0\u6CD5\u6253\u5F00\n- \u4FEE\u590D `guildmanage` \u76D1\u542C `message` \u95EE\u9898\n- \u4FEE\u590D\u6587\u4EF6\u8DEF\u5F84, \u4F7F\u7528\u5355\u4F8B\u6A21\u5F0F\u6765\u521B\u5EFA\u5BF9\u5E94\u8DEF\u5F84, \u4EE5\u53CA\u589E\u52A0\u5224\u65AD `edison` \u6587\u4EF6\u5939\n- \u4FEE\u590D `bilibili` \u589E\u52A0\u5728 `pptr` \u4E2D, \u8DF3\u8F6C\u5230\u7F51\u9875\u540E\u4F7F\u7528\u81EA\u5E26 `cookie` \u7684\u529F\u80FD\n- \u4FEE\u590D `bilibili` \u5BF9\u4E8E `vup` \u4EE5\u53CA `danmu` \u529F\u80FD, \u5728\u5173\u95ED\u56FE\u7247\u529F\u80FD\u4E2D, \u65E0\u6CD5\u6B63\u786E\u4F7F\u7528\u7684\u60C5\u51B5, \u589E\u52A0\u4E86\u5355\u72EC\u4F7F\u7528\u56FE\u7247\u7684\u65B9\u6CD5\n- \u5728 `bilibili` \u4E2D, \u589E\u52A0 `try-catch` \u5BF9\u4E8E\u6E32\u67D3\u52A8\u6001\u7684\u62A5\u9519\u6355\u83B7\n\n## Feature\n\n- \u66F4\u6539 `download` \u6587\u4EF6\u4E0B\u8F7D\u7684\u5BF9\u5E94\u6587\u4EF6\u8DEF\u5F84\u5305\n- \u66F4\u65B0\u63D2\u4EF6\u914D\u7F6E\u9875\u9762\u7684\u5C0F\u52A8\u753B\u4EE5\u53CA\u90E8\u5206\u5185\u5BB9\n\n\u8BE6\u7EC6\u66F4\u65B0\u65E5\u5FD7\u8BF7\u770B: [Release](https://github.com/Kabuda-czh/koishi-plugin-edison/releases/tag/1.1.2)\n\n## \u5982\u679C\u4F60\u89C9\u5F97\u8FD9\u4E2A\u63D2\u4EF6\u8FD8\u4E0D\u9519, \u53EF\u4EE5\u8003\u8651\u652F\u6301\u4E00\u4E0B\u6211\n## [\u7231\u53D1\u7535](https://afdian.net/a/kbd-dev)\n";
interface IPluginEnableConfig {
    enabled: boolean;
}
interface IConfig {
    superAdminQQ?: string[];
    KBotBasic?: botBasic.IConfig;
    KBotTwitter?: twitterPlugin.IConfig & IPluginEnableConfig;
}
export declare const Config: Schema<IConfig>;
export declare const logger: Logger;
export declare const using: readonly ["console", "database", "downloads"];
export declare function apply(ctx: Context, config: IConfig): Promise<void>;
export {};
