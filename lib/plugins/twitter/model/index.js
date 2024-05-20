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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-17 14:53:43
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-02-17 15:26:21
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\twitter\model\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
__exportStar(require("./userInfo.model"), exports);
__exportStar(require("./userTweet.model"), exports);
__exportStar(require("./dynamic.model"), exports);
