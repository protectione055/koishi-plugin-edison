import { type Argv, type Channel, type Context, type Dict } from 'koishi';
import type { DynamicNotifiction } from '../model';
import type { IConfig } from '.';
export declare function dynamicStrategy({ session, options, }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any, any>, list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, ctx: Context, config: IConfig): Promise<any>;
