import type { Context } from 'koishi';
import { Logger, Schema } from 'koishi';
import type { DynamicNotifiction } from '../model';
declare module '..' {
    interface TwitterChannel {
        dynamic?: DynamicNotifiction[];
    }
}
export interface IConfig {
    interval: number;
    useImage?: boolean;
    usePure?: boolean;
    onlyMedia?: boolean;
    authority: number;
    bearer_key?: string;
}
export declare const Config: Schema<IConfig>;
export declare const logger: Logger;
export declare function apply(ctx: Context, config: IConfig): Promise<void>;
