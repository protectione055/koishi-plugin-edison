import type { Argv, Channel, Context, Dict } from 'koishi';
import type { DynamicNotifiction } from '../model';
import type { IConfig } from '.';
export declare function twitterAdd({ session }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any>, twitter: {
    twitterId: string;
    twitterName: string;
    twitterRestId: string;
}, list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, _ctx: Context): Promise<string>;
export declare function twitterBatch({ session }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any>, twitter: {
    twitterId: string[];
    twitterName: string[];
    twitterRestId: string[];
}, list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, _ctx: Context): Promise<string>;
export declare function twitterRemove({ session }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any>, twitter: {
    twitterId: string;
    twitterName: string;
    twitterRestId: string;
}, list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>): Promise<string>;
export declare function twitterList({ session, }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any, any>): Promise<string>;
export declare function twitterSearch(_: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any>, twitter: {
    twitterId: string;
    twitterName: string;
    twitterRestId: string;
}, _list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, ctx: Context, config: IConfig): Promise<string>;
export declare function twitterCookie({ session, options, }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any, {
    cookie: string;
}>, _twitter: {
    twitterId: string;
    twitterName: string;
    twitterRestId: string;
}, _list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, ctx: Context): Promise<string>;
export declare function twitterToken({ session, options, }: Argv<never, 'id' | 'guildId' | 'platform' | 'twitter', any, {
    token: string;
}>, _twitter: {
    twitterId: string;
    twitterName: string;
    twitterRestId: string;
}, _list: Dict<[
    Pick<Channel, 'id' | 'guildId' | 'platform' | 'twitter'>,
    DynamicNotifiction
][]>, ctx: Context): Promise<string>;
