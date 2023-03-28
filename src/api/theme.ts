import { proxy } from "comlink";
import {
  extensionPort,
  OnThemeChangeValuesCallback,
  ThemeValuesGlobal,
} from "src";

/**
 * Returns the current theme's global token values.
 */
export async function getCurrentThemeValues(): Promise<ThemeValuesGlobal> {
  return await extensionPort.getCurrentThemeValues();
}

/**
 * Fires the `callback` parameter function with the updated theme values when the theme changes.
 */
export async function onThemeChangeValues(
  callback: OnThemeChangeValuesCallback
) {
  return await extensionPort.onThemeChangeValues(proxy(callback));
}
