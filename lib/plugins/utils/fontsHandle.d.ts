import type { Logger } from 'koishi';
export declare function getFontsList(path: string, logger: Logger): Promise<{
    fontFamily: string;
    fontUrl: string;
}[]>;
export declare function loadFont(needLoadFontList: {
    fontFamily: string;
    fontUrl: string;
}[]): Promise<string[]>;
