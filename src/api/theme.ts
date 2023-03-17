import { proxy } from "comlink";
import { extensionPort } from "src";
import { Theme } from "src/types";

export async function getCurrentTheme() {
  return await extensionPort.getCurrentTheme();
}

export async function onThemeChange(callback: (theme: Theme) => void) {
  return await extensionPort.onThemeChange(proxy(callback));
}
