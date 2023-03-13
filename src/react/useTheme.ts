import { useState, useEffect } from "react";
import * as replit from "../index";
import {
  CustomThemeGraphqlType,
  ThemeEditorSyntaxHighlighting,
  ThemeGlobalTokens,
} from "../index";
import useReplit from "./useReplit";

interface UseThemeOutput {
  global: ThemeGlobalTokens;
  editor: Array<ThemeEditorSyntaxHighlighting>;
  timeUpdated: string;
  description: string;
  id: number;
  hsl: [number, number, number];
}

/**
 * Returns the tokens and metadata for the current active theme.
 */
export default function useTheme(): UseThemeOutput {
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
    hsl: [currentTheme.hue, currentTheme.saturation, currentTheme.lightness],
  };
}
