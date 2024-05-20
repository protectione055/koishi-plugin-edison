import type { Context } from 'koishi';
import { Logger, Schema } from 'koishi';
export interface IConfig {
    useModel?: any;
    botName?: string;
}
export declare const Config: Schema<IConfig>;
export declare const logger: Logger;
export declare function apply(ctx: Context, config: IConfig): Promise<void>;
