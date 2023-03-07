import { useState, useEffect, useRef } from "react";
import * as replit from "../index";

interface UseReplitInitialized {
  connected: true;
  error: null;
  filePath: string;
  replit: typeof replit;
  loading: boolean;
}

interface UseReplitPreInitialization {
  connected: false;
  error: null;
  filePath: null;
  replit: null;
  loading: boolean;
}

interface UseReplitFailure {
  connected: false;
  error: string;
  filePath: null;
  replit: null;
  loading: boolean;
}

export default function useReplit(init?: { permissions: Array<string> }) {
  const [connected, setConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const runRef = useRef(0);

  useEffect(() => {
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
        dispose = await replit.init(init || { permissions: [] });
        setFilePath(await replit.me.filePath());
        setConnected(true);
      } catch (e) {
        setError(e.toString());
      }
      setLoading(false);
    })();

    return () => {
      dispose();
    };
  }, []);

  const output = { connected, error, filePath, replit, loading };

  if (connected) {
    return output as UseReplitInitialized;
  } else if (error) {
    return output as UseReplitFailure;
  } else {
    return output as UseReplitPreInitialization;
  }
}
