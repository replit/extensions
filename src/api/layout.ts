import { Pane } from "src/types";
import { extensionPort } from "src/util/comlink";

export async function isPaneTypeVisible(paneType: string) {
  return extensionPort.isPaneTypeVisible(paneType);
}

export async function findPaneByType(paneType: string) {
  return extensionPort.findPaneByType(paneType);
}
export async function selectTab(paneId: string) {
  return extensionPort.selectTab(paneId);
}

export async function insertFloatingPaneIfNotExist(pane: Pane) {
  return extensionPort.insertFloatingPaneIfNotExist(pane);
}
export async function removeFloatingPanesByType(paneType: string) {
  return extensionPort.removeFloatingPanesByType(paneType);
}
