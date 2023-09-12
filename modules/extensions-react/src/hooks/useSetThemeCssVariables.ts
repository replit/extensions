import { useEffect, useState } from "react";
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
    let themeDispose: null | (() => void) = null;

    let dispose = () => {
      if (themeDispose) {
        themeDispose();
        themeDispose = null;
      }
    };

    (async () => {
      const themeValues = await themes.getCurrentThemeValues();

      setValues(themeValues);

      await themes.onThemeChangeValues(setValues);

      themeDispose = await themes.onThemeChangeValues(setValues);
    })();

    return dispose;
  }, []);

  useEffect(() => {
    if (values) {
      const css = buildCssString(values);
      applyTheme(css);
    }
  }, [values]);

  return values;
}
