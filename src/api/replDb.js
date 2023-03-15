"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.list = exports.get = exports.set = void 0;
const comlink_1 = require("src/util/comlink");
/**
 * Sets the value for a given key
 */
async function set(args) {
    return comlink_1.extensionPort.setReplDbValue(args.key, args.value);
}
exports.set = set;
/**
 * Returns a value associated with the given key
 */
async function get(args) {
    return comlink_1.extensionPort.getReplDbValue(args.key);
}
exports.get = get;
/**
 * Lists keys in the replDb. Accepts an optional `prefix`, which filters for keys beginning with the given prefix.
 */
async function list(args) {
    return comlink_1.extensionPort.listReplDbKeys(args.prefix);
}
exports.list = list;
/**
 * Deletes a key in the replDb.
 */
async function del(args) {
    return comlink_1.extensionPort.deleteReplDbKey(args.key);
}
exports.del = del;
