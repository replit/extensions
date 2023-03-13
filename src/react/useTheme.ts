import { useState, useEffect } from "react";
import * as replit from "../index";
import { CustomThemeGraphqlType } from "../index";
import useReplit from "./useReplit";

export default function useTheme() {
  const [theme, setTheme] = useState<CustomThemeGraphqlType | null>(null);
  const { status } = useReplit();

  useEffect(() => {
    if (status !== "ready") {
      return;
    }

    let themeDispose: () => void;
    let dispose = () => {
      if (themeDispose) {
        themeDispose();
        themeDispose = null;
      }
    };

    (async () => {
      if (status !== "ready") {
        return;
      }

      const th = await replit.theme.getCurrentTheme();
      setTheme(th);
      themeDispose = await replit.theme.onThemeChange((_theme) => {
        setTheme(_theme);
      });
    })();

    return dispose;
  }, [status]);

  const currentTheme =
    status === "ready" ? (theme as CustomThemeGraphqlType) : null;

  return {
    global: currentTheme.values.global,
    editor: currentTheme.values.editor.syntaxHighlighting,
    timeUpdated: currentTheme.timeUpdated,
    description: currentTheme.description,
    id: currentTheme.id,
    hsl: [currentTheme.hue, currentTheme.saturation, currentTheme.lightness]
  };
}
