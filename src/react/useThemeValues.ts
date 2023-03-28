import { useState } from "react";
import { ThemeValuesGlobal } from "src/types";
import useReplitEffect from "./useReplitEffect";

export default function useTheme() {
  const [values, setValues] = useState<ThemeValuesGlobal | null>(null);

  useReplitEffect(async ({ theme }) => {
    const themeValues = await theme.getCurrentThemeValues();

    setValues(themeValues);

    await theme.onThemeChangeValues((themeValues) => {
      setValues(themeValues);
    });
  }, []);

  return values;
}
