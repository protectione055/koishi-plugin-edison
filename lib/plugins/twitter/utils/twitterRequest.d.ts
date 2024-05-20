import type { Context, Logger, Quester } from 'koishi';
import type { Tweets } from '../model';
export declare function getTwitterRestId(twitterId: string, http: Quester, logger: Logger): Promise<string[]>;
export declare function getTwitterTweets(restId: string, ctx: Context, logger: Logger, isPure?: boolean, isListen?: boolean): Promise<Tweets>;
