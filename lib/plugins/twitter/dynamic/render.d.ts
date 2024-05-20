import type { Context } from 'koishi';
import type { Tweet, UserInfo } from '../model';
import type { IConfig } from '.';
export declare function renderFunction(ctx: Context, tweets: Tweet, user_info: UserInfo, config: IConfig, isListen?: boolean): Promise<string>;
