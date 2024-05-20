import { type Context, Logger, Schema } from 'koishi';
export interface IConfig {
    language?: string;
    voice?: string;
    style?: string;
    styledegree?: string;
    role?: string;
    silence?: number;
    rate?: number;
    pitch?: number;
}
export declare const Config: Schema<IConfig>;
export declare const logger: Logger;
export declare function apply(ctx: Context, _config: IConfig): Promise<void>;
