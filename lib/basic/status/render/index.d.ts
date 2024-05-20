import type { Context } from 'koishi';
import { segment } from 'koishi';
import type { SystemInfo } from '../utils';
export declare function renderHtml(ctx: Context, systemInfo: SystemInfo): Promise<string | segment>;
export declare function renderRandom(ctx: Context, sort: string, systemInfo: SystemInfo['random'], botUid: string): Promise<string | segment>;
