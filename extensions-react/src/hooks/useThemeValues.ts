import { useState } from "react";
import { ThemeValuesGlobal } from "@replit/extensions";
import useReplitEffect from "./useReplitEffect";

/**
 * Returns the global tokens of the current user's theme.
 */
export default function useThemeValues() {
  const [values, setValues] = useState<ThemeValuesGlobal | null>(null);

  useReplitEffect(async ({ themes }) => {
    const themeValues = await themes.getCurrentThemeValues();

    setValues(themeValues);

    await themes.onThemeChangeValues((themeValues) => {
      setValues(themeValues);
    });
  }, []);

  return values;
}
