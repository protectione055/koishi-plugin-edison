import type { Context } from 'koishi';
import { Quester, Schema } from 'koishi';
import * as dynamic from './dynamic';
export interface TwitterChannel {
}
declare module 'koishi' {
    interface Channel {
        twitter: TwitterChannel;
    }
}
export interface IConfig {
    dynamic: dynamic.IConfig;
    quester: Quester.Config;
}
export declare const Config: Schema<IConfig>;
export declare function apply(context: Context, config: IConfig): void;
