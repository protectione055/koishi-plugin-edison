import type { Context } from 'koishi';
import { Logger, Schema } from 'koishi';
import * as botBasic from './basic';
import * as twitterPlugin from './plugins/twitter';
export declare const name = "edison";
export declare const usage = "\n<style>\nhtml, body {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  background: #000;\n}\nsvg {\n  width: 100%;\n  height: 100px;\n  margin: auto;\n}\nsvg text {\n  text-transform: uppercase;\n  animation: stroke 5s infinite alternate;\n  letter-spacing: 10px;\n  font-size: 90px;\n}\n@keyframes stroke {\n  0% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-dashoffset: 25%;\n    stroke-dasharray: 0 50%;\n    stroke-width: 0.8;\n  }\n  50% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-width: 1.2;\n  }\n  70% {\n    fill: rgba(72, 138, 20, 0);\n    stroke: rgba(54, 95, 160, 1);\n    stroke-width: 1.5;\n  }\n  90%,\n  100% {\n    fill: rgba(72, 138, 204, 1);\n    stroke: rgba(54, 95, 160, 0);\n    stroke-dashoffset: -25%;\n    stroke-dasharray: 50% 0;\n    stroke-width: 0;\n  }\n}\n\n</style>\n<svg viewBox=\"400 0 400 200\">\n  <text x=\"0\" y=\"70%\"> Koishi-Plugin-edison </text>\n</svg>\n\n# Edison v0.1.1 \u66F4\u65B0\u65E5\u5FD7\n\n## Feature\n\n- \u901A\u8FC7bearer token \u83B7\u53D6 `twitter` \u52A8\u6001\n\n## \u8FD9\u4E2A\u63D2\u4EF6\u5728kbot\u57FA\u7840\u4E0A\u4FEE\u6539\u800C\u6765\uFF0C\u7279\u6B64\u611F\u8C22\u539F\u4F5C\u8005\n";
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
