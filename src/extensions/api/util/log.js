"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDebugMode = exports.debug = void 0;
let debugMode = false;
function debug(msg) {
    if (!debugMode) {
        return;
    }
    console.log(msg);
}
exports.debug = debug;
function setDebugMode(mode) {
    debugMode = mode;
}
exports.setDebugMode = setDebugMode;
