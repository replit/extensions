import { proxy } from "comlink";
import { extensionPort, ThemeValuesGlobal } from "src";

/**
 * Returns the current theme's global token values.
 */
export async function getCurrentThemeValues() {
  return await extensionPort.getCurrentThemeValues();
}

/**
 * Fires the `callback` parameter function with the updated theme values when the theme changes.
 */
export async function onThemeChangeValues(
  callback: (theme: ThemeValuesGlobal) => void
) {
  return await extensionPort.onThemeChangeValues(proxy(callback));
}
