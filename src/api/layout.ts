import { LayoutData, Pane } from "src/types";
import { extensionPort } from "src/util/comlink";

/**
 * Returns whether a certain pane type is visible within the layout.
 * Example use case: check if the version control pane is visible
 * before doing something.
 */
export async function isPaneTypeVisible(paneType: string) {
  return extensionPort().isPaneTypeVisible(paneType);
}

/**
 * Returns information about a pane by its type. If multiple panes of a type are open, this returns the first.
 */
export async function findPaneByType(paneType: string) {
  return extensionPort().findPaneByType(paneType);
}

/**
 * Makes a pane the active one within its group
 */
export async function selectTab(paneId: string) {
  return extensionPort().selectTab(paneId);
}

/**
 * Inserts a floating pane into the layout if it doesn't exist
 */
export async function insertFloatingPaneIfNotExist(pane: Pane) {
  return extensionPort().insertFloatingPaneIfNotExist(pane);
}

/**
 * Removes all floating pane of a given type
 */
export async function removeFloatingPanesByType(paneType: string) {
  return extensionPort().removeFloatingPanesByType(paneType);
}

/**
 * Gets the entire layout tree, with pane data
 */
export async function getLayoutState() {
  return extensionPort().getLayoutState();
}

/**
 * Sets the layout tree and pane data
 */
export async function setLayoutState(state: LayoutData) {
  return extensionPort().setLayoutState(state);
}
