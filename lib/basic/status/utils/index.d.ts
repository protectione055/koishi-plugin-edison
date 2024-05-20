import * as si from 'systeminformation';
export type SystemInfo = ReturnType<typeof getSystemInfo> extends Promise<infer T> ? T : never;
export declare function getSystemInfo(name: string, koishiVersion: string, kbotVersion: any, pluginSize: number): Promise<{
    name: string;
    dashboard: {
        progress: number;
        title: string;
    }[];
    information: {
        key: string;
        value: string;
    }[];
    footer: string;
    platform: string;
    random: {
        name: string;
        systemInfo: {
            title: string;
            value: string;
        }[];
        functions: {
            CPU: {
                progress: number;
                args: {
                    core: string;
                    speed: string;
                };
            };
            Mem: {
                progress: number;
                args: {
                    total: string;
                    used: string;
                    free: string;
                };
            };
            Swap: {
                progress: number;
                args: {
                    total: string;
                    used: string;
                    free: string;
                };
            };
        };
        disks: si.Systeminformation.FsSizeData[];
        footer: {
            OS: string;
            CPU: string;
            Version: string;
            Plugins: string;
        };
        footerSpan: string;
    };
}>;
