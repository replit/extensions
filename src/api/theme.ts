import { proxy } from "comlink";
import { extensionPort } from "src";

export async function getCurrentTheme() {
  return await extensionPort.getCurrentTheme();
}

export async function onThemeChange(callback) {
  return await extensionPort.onThemeChange(proxy(callback));
}