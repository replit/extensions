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
 * Returns the global tokens of the current user's theme.
 * @param setCssVariables If true, will add themed tokens as CSS variables to the :root selector.
 */
export default function useThemeValues({
  setCssVariables,
}: {
  /** If true, will add themed tokens as CSS variables to the :root selector */
  setCssVariables?: boolean;
}) {
  const [values, setValues] = useState<ThemeValuesGlobal | null>(null);

  useReplitEffect(async ({ themes }) => {
    const themeValues = await themes.getCurrentThemeValues();

    setValues(themeValues);

    if (setCssVariables) {
      const css = buildCssString(themeValues);
      applyTheme(css);
    }

    await themes.onThemeChangeValues(setValues);
  }, []);

  return values;
}
