import { useState } from "react";
import { ThemeValuesGlobal } from "src/extensions/types";
import useReplitEffect from "./useReplitEffect";

export default function useTheme() {
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
