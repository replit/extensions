"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = exports.me = exports.replDb = exports.fs = exports.layout = void 0;
const fs = require("./fs");
exports.fs = fs;
const layout = require("./layout");
exports.layout = layout;
const replDb = require("./replDb");
exports.replDb = replDb;
const me = require("./me");
exports.me = me;
const theme = require("./theme");
exports.theme = theme;
// deprecate this after migrating existing extensions
__exportStar(require("./fs"), exports);
