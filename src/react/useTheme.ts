import React from "react";
import { HandshakeStatus, Theme } from "src/types";
import useReplit from "./useReplit";

export default function useTheme() {
  const [theme, setTheme] = React.useState<Theme | null>(null);

  const { status, replit } = useReplit();

  const connected = status === HandshakeStatus.Ready;

  React.useEffect(() => {
    if (!connected) {
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
      if (!connected) {
        return;
      }

      const th: Theme = await replit.theme.getCurrentTheme();
      setTheme(th);
      themeDispose = await replit.theme.onThemeChange((_theme: Theme) => {
        setTheme(_theme);
      });
    })();

    return dispose;
  }, [connected]);

  return theme;
}
