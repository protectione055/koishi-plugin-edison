import type { Channel, Context, Dict, Logger } from 'koishi';
import type { DynamicNotifiction, Tweets } from '../model';
import type { IConfig } from '.';
export declare function listen(list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, request: (restId: string, ctx: Context, logger: Logger, isPure?: boolean, isListen?: boolean) => Promise<Tweets>, ctx: Context, config: IConfig): AsyncGenerator<any, void, unknown>;
