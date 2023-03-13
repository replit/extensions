import { useState, useEffect, useRef, useMemo } from "react";
import * as replit from "../index";

interface UseReplitInitialized {
  status: "ready";
  error: null;
  filePath: string;
  replit: typeof replit;
}

interface UseReplitPreInitialization {
  status: "loading";
  error: null;
  filePath: null;
  replit: null;
}

interface UseReplitFailure {
  status: "error";
  error: string;
  filePath: null;
  replit: null;
}

/**
 * A React hook that initializes and passes the Replit API wrapper to a component.
 */
export default function useReplit(args?: { permissions: Array<string> }) {
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const runRef = useRef(0);

  useEffect(() => {
    // Avoids duplicate runs of init
    if (runRef.current === 1) {
      return;
    }
    runRef.current += 1;

    if (status === "ready") {
      return;
    }

    let dispose = () => {};

    (async () => {
      try {
        dispose = await replit.init(args || { permissions: [] });
        setFilePath(await replit.me.filePath());
        setStatus("ready");
      } catch (e) {
        setError(e.toString());
        setStatus("error");
      }
    })();

    return () => {
      dispose();
    };
  }, []);

  return useMemo(() => {
    const output = { status, error, filePath, replit };
    if (status === "ready") {
      return output as UseReplitInitialized;
    } else if (status === "error") {
      return output as UseReplitFailure;
    } else {
      return output as UseReplitPreInitialization;
    }
  }, [status, error, filePath, replit]);
}
