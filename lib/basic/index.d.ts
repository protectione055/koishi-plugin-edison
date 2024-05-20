import type { Context } from 'koishi';
import { Logger, Schema } from 'koishi';
import * as statusPlugin from './status';
export interface IConfig {
    checkBody?: {
        enabled: boolean;
    } & statusPlugin.IConfig;
    tts?: boolean;
}
export declare const Config: Schema<IConfig>;
export declare const logger: Logger;
export declare function apply(ctx: Context, config: IConfig): Promise<void>;
