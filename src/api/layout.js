"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setLayoutState = exports.getLayoutState = exports.removeFloatingPanesByType = exports.insertFloatingPaneIfNotExist = exports.selectTab = exports.findPaneByType = exports.isPaneTypeVisible = void 0;
const comlink_1 = require("src/util/comlink");
/**
 * Returns whether a certain pane type is visible within the layout.
 * Example use case: check if the version control pane is visible
 * before doing something.
 */
async function isPaneTypeVisible(paneType) {
    return comlink_1.extensionPort.isPaneTypeVisible(paneType);
}
exports.isPaneTypeVisible = isPaneTypeVisible;
/**
 * Returns information about a pane by its type. If multiple panes of a type are open, this returns the first.
 */
async function findPaneByType(paneType) {
    return comlink_1.extensionPort.findPaneByType(paneType);
}
exports.findPaneByType = findPaneByType;
/**
 * Makes a pane the active one within its group
 */
async function selectTab(paneId) {
    return comlink_1.extensionPort.selectTab(paneId);
}
exports.selectTab = selectTab;
/**
 * Inserts a floating pane into the layout if it doesn't exist
 */
async function insertFloatingPaneIfNotExist(pane) {
    return comlink_1.extensionPort.insertFloatingPaneIfNotExist(pane);
}
exports.insertFloatingPaneIfNotExist = insertFloatingPaneIfNotExist;
/**
 * Removes all floating pane of a given type
 */
async function removeFloatingPanesByType(paneType) {
    return comlink_1.extensionPort.removeFloatingPanesByType(paneType);
}
exports.removeFloatingPanesByType = removeFloatingPanesByType;
/**
 * Gets the entire layout tree, with pane data
 */
async function getLayoutState() {
    return comlink_1.extensionPort.getLayoutState();
}
exports.getLayoutState = getLayoutState;
/**
 * Sets the layout tree and pane data
 */
async function setLayoutState(state) {
    return comlink_1.extensionPort.setLayoutState(state);
}
exports.setLayoutState = setLayoutState;
