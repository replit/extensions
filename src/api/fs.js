"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchTextFile = exports.watchFile = exports.copyFile = exports.move = exports.deleteDir = exports.deleteFile = exports.createDir = exports.readDir = exports.writeFile = exports.readFile = void 0;
const comlink_1 = require("src/util/comlink");
/**
 * Reads the file specified at `path` and returns an object containing the contents, or an object containing an error if there was one
 */
async function readFile(path) {
    return comlink_1.extensionPort.readFile(path);
}
exports.readFile = readFile;
/**
 * Writes the file specified at `path` with the contents `content`
 */
async function writeFile(path, content) {
    return comlink_1.extensionPort.writeFile(path, content);
}
exports.writeFile = writeFile;
/**
 * Reads the directory specified at `path` and returns an object containing the contents, or an object containing an error if there was one
 */
async function readDir(path) {
    return comlink_1.extensionPort.readDir(path);
}
exports.readDir = readDir;
/**
 * Creates a directory at the specified path
 */
async function createDir(path) {
    return comlink_1.extensionPort.createDir(path);
}
exports.createDir = createDir;
/**
 * Deletes the file at the specified path
 */
async function deleteFile(path) {
    return comlink_1.extensionPort.deleteFile(path);
}
exports.deleteFile = deleteFile;
/**
 * Deletes the directory at the specified path
 */
async function deleteDir(path) {
    return comlink_1.extensionPort.deleteDir(path);
}
exports.deleteDir = deleteDir;
/**
 * Moves the file or directory at `from` to `to`
 */
async function move(path, to) {
    return comlink_1.extensionPort.move(path, to);
}
exports.move = move;
/**
 * Copies the file at `from` to `to`
 */
async function copyFile(path, to) {
    return comlink_1.extensionPort.copyFile(path, to);
}
exports.copyFile = copyFile;
/**
 * Watches the file at `path` for changes with the provided `watchers`. Returns a dispose method which cleans up the watchers
 */
async function watchFile(path, watchers) {
    // Note: comlink does not let us test for functions being present, so we provide default functions for all callbacks in case the user does not pass those, to keep the API flexible
    return comlink_1.extensionPort.watchFile(path, (0, comlink_1.proxy)({
        onChange: () => { },
        onMoveOrDelete: () => { },
        onError: () => { },
        ...watchers,
    }));
}
exports.watchFile = watchFile;
/**
 * Watches a text file at `path` for changes with the provided `watchers`. Returns a dispose method which cleans up the watchers.
 *
 * Use this for watching text files, and receive changes as versioned operational transform (OT) operations annotated with their source.
 */
async function watchTextFile(path, watchers) {
    // Note: comlink does not let us test for functions being present, so we provide default functions for all callbacks in case the user does not pass those, to keep the API flexible
    return comlink_1.extensionPort.watchTextFile(path, (0, comlink_1.proxy)({
        onReady: () => { },
        onChange: () => { },
        onMoveOrDelete: () => { },
        onError: () => { },
        ...watchers,
    }));
}
exports.watchTextFile = watchTextFile;
