import React from "react";
import * as replit from "../index";

export default function useReplit() {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [filePath, setFilePath] = React.useState(null);
  const runRef = React.useRef(0);

  React.useEffect(() => {
    // Avoids duplicate runs of init
    if (runRef.current === 1) {
      return;
    }
    runRef.current += 1;

    if (connected) {
      return;
    }

    let dispose = () => {};

    (async () => {
      try {
        dispose = await replit.init({ permissions: [] });
        setFilePath(await replit.me.filePath());
        setConnected(true);
      } catch (e) {
        setError(e);
      }
    })();

    return () => {
      dispose();
    };
  }, []);

  return React.useMemo(
    () => ({ connected, error, filePath, replit }),
    [connected, error, filePath, replit]
  );
}
