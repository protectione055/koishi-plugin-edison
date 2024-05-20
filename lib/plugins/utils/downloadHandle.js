"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAndMoveFiles = void 0;
async function downloadAndMoveFiles(task, resource, urls, ctx) {
    const downloadPromise = ctx.downloads.nereid(task, urls, resource, {
        retry: 3,
    });
    return downloadPromise.promise;
}
exports.downloadAndMoveFiles = downloadAndMoveFiles;
