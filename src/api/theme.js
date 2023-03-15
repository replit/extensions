"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onThemeChange = exports.getCurrentTheme = void 0;
const comlink_1 = require("comlink");
const src_1 = require("src");
async function getCurrentTheme() {
    return await src_1.extensionPort.getCurrentTheme();
}
exports.getCurrentTheme = getCurrentTheme;
async function onThemeChange(callback) {
    return await src_1.extensionPort.onThemeChange((0, comlink_1.proxy)(callback));
}
exports.onThemeChange = onThemeChange;
