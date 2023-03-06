import React from "react";
import * as replit from "../index";

export default function useReplit() {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [filePath, setFilePath] = React.useState(null);
  const runRef = React.useRef(0);

  React.useEffect(() => {
    runRef.current += 1;
    if (runRef.current === 1) {
      return;
    }

    if (connected) {
      return;
    }

    let dispose = () => {
      console.log("old dispose");
    };

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

  return { connected, error, filePath, replit };
}
