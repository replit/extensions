import React from "react";
import { HandshakeStatus, ThemeVersion } from "@replit/extensions";
import { useReplit } from "./useReplit";

/**
 * Returns the information on the current user's theme including global tokens, syntax highlighting modifiers, and metadata.
 */
export default function useTheme() {
  const [theme, setTheme] = React.useState<ThemeVersion | null>(null);

  const { status, replit } = useReplit();

  const connected = status === HandshakeStatus.Ready;

  React.useEffect(() => {
    if (!connected) {
      return;
    }

    let themeDispose: null | (() => void) = null;
    let dispose = () => {
      if (themeDispose) {
        themeDispose();
        themeDispose = null;
      }
    };

    (async () => {
      if (!replit) {
        return;
      }

      const th: ThemeVersion = await replit.themes.getCurrentTheme();
      setTheme(th);
      themeDispose = await replit.themes.onThemeChange(
        (_theme: ThemeVersion) => {
          setTheme(_theme);
        }
      );
    })();

    return dispose;
  }, [replit]);

  return theme;
}
