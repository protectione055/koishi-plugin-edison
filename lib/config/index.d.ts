interface GeneratePathData {
    baseDir: string;
    edisonDir: string;
    fontsDir: string;
    renderFontsDir: string;
    statusFontsDir: string;
    imagesDir: string;
    statusImagesDir: string;
    tarotImagesDir: string;
    bilibiliDir: string;
    bilibiliCookiePath: string;
    bilibiliVupPath: string;
    twitterDir: string;
    twitterCookiePath: string;
    twitterTokenPath: string;
}
declare class GeneratePath {
    private static instance;
    private generatePathData;
    private constructor();
    static getInstance(path: string): GeneratePath;
    setFontsDir(fontsDir: string): void;
    setImagesDir(imagesDir: string): void;
    getGeneratePathData(): GeneratePathData;
}
export default GeneratePath;
