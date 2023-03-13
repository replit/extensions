import React from "react";
import * as replit from "../index";
import useReplit from "./useReplit";

export default function useTheme() {
  const [theme, setTheme] = React.useState(null);
  const { status } = useReplit();

  React.useEffect(() => {
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

  return theme;
}
