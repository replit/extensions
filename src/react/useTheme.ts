import React from "react";
import * as replit from "../index";

export default function useTheme({ connected }: { connected: boolean }) {
  const [theme, setTheme] = React.useState(null);

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
