import React from "react";
import { HandshakeStatus } from "src/types";
import useReplit from "./useReplit";

export default function useTheme() {
  const [theme, setTheme] = React.useState(null);

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

      const th = await replit.theme.getCurrentTheme();
      setTheme(th);
      themeDispose = await replit.theme.onThemeChange((_theme) => {
        setTheme(_theme);
      });
    })();

    return dispose;
  }, [connected]);

  return theme;
}
