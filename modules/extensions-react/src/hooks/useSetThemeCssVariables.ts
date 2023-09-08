import { useState } from "react";
import { ThemeValuesGlobal } from "@replit/extensions";
import useReplitEffect from "./useReplitEffect";

const toKebabCase = (str: string) =>
  str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const buildCssString = (themeValues: ThemeValuesGlobal) => {
  return Object.entries(themeValues)
    .map(([key, value]) => `--${toKebabCase(key)}: ${value};`)
    .join(" ");
};

const applyTheme = (css: string) => {
  const styleElement = document.createElement("style");
  styleElement.textContent = `:root { ${css} }`;
  document.head.append(styleElement);
};

/**
 * Sets the global tokens of the current user's theme as CSS variables on the :root selector.
 */
export default function useSetThemeCssVariables() {
  const [values, setValues] = useState<ThemeValuesGlobal | null>(null);

  useReplitEffect(async ({ themes }) => {
    const themeValues = await themes.getCurrentThemeValues();

    setValues(themeValues);

    const css = buildCssString(themeValues);
    applyTheme(css);

    await themes.onThemeChangeValues(setValues);
  }, []);

  return values;
}
