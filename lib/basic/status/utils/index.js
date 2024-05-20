"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSystemInfo = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-16 09:35:30
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-07-24 12:03:19
 * @FilePath: \KBot-App\plugins\kbot\src\basic\status\utils\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
const node_os_1 = __importDefault(require("node:os"));
const si = __importStar(require("systeminformation"));
const ErrorInfo = 'N / A';
async function getSystemInfo(name, koishiVersion, kbotVersion, pluginSize) {
    const promiseList = await Promise.all([
        getCPUUsage(),
        si.osInfo(),
        si.cpuCurrentSpeed(),
        si.mem(),
        getDiskUsage(),
        si.cpu(),
    ]);
    const { uptime } = si.time();
    const [{ cpuUsage, cpuInfo }, { distro, platform, release, build }, { avg }, { total, used, swaptotal, swapused }, { disksize, diskused, disks }, { cores },] = promiseList;
    const formatSize = (size) => (size / 1024 ** 3).toFixed(2);
    // memory
    const memoryTotal = `${formatSize(total || 0)} GB`;
    const memoryUsed = formatSize(used || 0);
    const memoryUsage = ((used || 0) / (total || 1)).toFixed(2);
    const memoryFree = formatSize(total - used);
    // swap
    const swapTotal = `${formatSize(swaptotal || 0)} GB`;
    const swapUsed = formatSize(swapused || 0);
    const swapUsage = ((swapused || 0) / (swaptotal || 1)).toFixed(2);
    const swapFree = formatSize(swaptotal - swapused);
    // disk
    const diskTotal = `${formatSize(disksize || 0)} GB`;
    const diskUsed = formatSize(diskused || 0);
    const diskUsage = ((diskused || 0) / (disksize || 1)).toFixed(2);
    const systemInfo = {
        name,
        dashboard: [
            {
                progress: +cpuUsage || 0,
                title: `${((+cpuUsage || 0) * 100).toFixed(0)}% - ${avg}Ghz  [${cores}core]`,
            },
            {
                progress: +memoryUsage || 0,
                title: Number.isNaN(+memoryUsed)
                    ? ErrorInfo
                    : `${memoryUsed} / ${memoryTotal}`,
            },
            {
                progress: +swapUsage || 0,
                title: Number.isNaN(+swapUsed) ? ErrorInfo : `${swapUsed} / ${swapTotal}`,
            },
            {
                progress: +diskUsage || 0,
                title: Number.isNaN(+diskUsed) ? ErrorInfo : `${diskUsed} / ${diskTotal}`,
            },
        ],
        information: [
            {
                key: 'CPU',
                value: cpuInfo,
            },
            {
                key: 'System',
                value: distro,
            },
            {
                key: 'Version',
                value: koishiVersion,
            },
            {
                key: 'Plugins',
                value: `${pluginSize} loaded`,
            },
        ],
        footer: durationTime(uptime),
        platform,
        random: {
            name,
            systemInfo: [
                {
                    title: '系统持续运行',
                    value: `📆 ${durationTime(uptime).split(' ').slice(-3).join(' ')}`,
                },
                {
                    title: '编译环境',
                    // eslint-disable-next-line n/prefer-global/process
                    value: `📦 Node ${process.version}`,
                },
                {
                    title: '系统环境',
                    value: `🖥️ ${platform}`,
                },
            ],
            functions: {
                CPU: {
                    progress: +cpuUsage,
                    args: {
                        core: `Cores: ${cores}`,
                        speed: `Speed: ${avg}Ghz`,
                    },
                },
                Mem: {
                    progress: +memoryUsage || 0,
                    args: {
                        total: `Total: ${formatSize(total)}GB`,
                        used: `Used: ${memoryUsed}GB`,
                        free: `Free: ${memoryFree}GB`,
                    },
                },
                Swap: {
                    progress: +swapUsage || 0,
                    args: {
                        total: `Total: ${formatSize(swaptotal)}GB`,
                        used: `Used: ${swapUsed}GB`,
                        free: `Free: ${swapFree}GB`,
                    },
                },
            },
            disks,
            footer: {
                OS: distro,
                CPU: cpuInfo,
                Version: `${release} Build ${build}`,
                Plugins: `${pluginSize} loaded`,
            },
            footerSpan: `Generated by Koishi v${koishiVersion} / koishi-plugin-kbot v${kbotVersion}`,
        },
    };
    return systemInfo;
}
exports.getSystemInfo = getSystemInfo;
async function getDiskUsage() {
    const disks = await si.fsSize();
    let disksize = 0;
    let diskused = 0;
    disks.forEach((disk) => {
        disksize += disk?.size || 0;
        diskused += disk?.used || 0;
    });
    return {
        disksize,
        diskused,
        disks,
    };
}
async function getCPUUsage() {
    const t1 = getCPUInfo();
    await new Promise(resolve => setTimeout(resolve, 1000));
    const t2 = getCPUInfo();
    const idle = (t2?.idle || 0) - (t1?.idle || 0);
    const total = (t2.total || 0) - (t1.total || 0);
    const cpuUsage = (1 - idle / total).toFixed(2);
    const cpuInfo = node_os_1.default.cpus()[0]?.model || 'unknown';
    return {
        cpuUsage,
        cpuInfo,
    };
}
function getCPUInfo() {
    const cpus = node_os_1.default.cpus();
    let idle = 0;
    const total = cpus?.reduce((acc, cpu) => {
        for (const type in cpu?.times)
            acc += cpu.times[type];
        idle += cpu?.times?.idle || 0;
        return acc;
    }, 0);
    return {
        idle,
        total,
    };
}
function durationTime(time) {
    const day = Math.floor(time / 86400);
    const hour = Math.floor((time - day * 86400) / 3600);
    const minute = Math.floor((time - day * 86400 - hour * 3600) / 60);
    return `已持续运行 ${day}天 ${hour}小时 ${minute}分钟`;
}
