"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringFormat = void 0;
/*
 * @Author: Kabuda-czh
 * @Date: 2023-02-06 12:50:16
 * @LastEditors: Kabuda-czh
 * @LastEditTime: 2023-02-17 14:50:50
 * @FilePath: \KBot-App\plugins\kbot\src\plugins\utils\format.ts
 * @Description:
 *
 * Copyright (c) 2023 by Kabuda-czh, All Rights Reserved.
 */
function StringFormat(str, ...args) {
    args.forEach((arg) => {
        str = str.replace(/%s/, arg.toString());
    });
    return str;
}
exports.StringFormat = StringFormat;
