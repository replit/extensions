import { useState, useEffect, useRef, useMemo } from "react";
import { getHandshakeStatus } from "src/util/talk";
import * as replit from "../index";
import { HandshakeStatus } from "src/types";

interface UseReplitReady {
  status: HandshakeStatus.Ready;
  error: null;
  filePath: string;
  replit: typeof replit;
}

interface UseReplitLoading {
  status: HandshakeStatus.Loading;
  error: null;
  filePath: null;
  replit: null;
}

interface UseReplitFailure {
  status: HandshakeStatus.Error;
  error: Error;
  filePath: null;
  replit: null;
}

/**
 * A React hook that initializes and passes the Replit API wrapper to a component.
 */
export default function useReplit(args?: { permissions: Array<string> }) {
  const [status, setStatus] = useState<HandshakeStatus>(getHandshakeStatus());
  const [error, setError] = useState<string | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const runRef = useRef(0);

  useEffect(() => {
    // Avoids duplicate runs of init
    if (runRef.current === 1) {
      return;
    }
    runRef.current += 1;

    if (status === HandshakeStatus.Ready) {
      return;
    }

    let dispose = () => {};

    (async () => {
      try {
        dispose = await replit.init(args || { permissions: [] });
        setFilePath(await replit.me.filePath());
        setStatus(HandshakeStatus.Ready);
      } catch (e) {
        setError(e);
        setStatus(HandshakeStatus.Error);
      }
    })();

    return () => {
      dispose();
    };
  }, []);

  return useMemo(() => {
    const output = { status, error, filePath, replit };
    if (status === HandshakeStatus.Ready) {
      return output as UseReplitReady;
    } else if (status === HandshakeStatus.Error) {
      return output as UseReplitFailure;
    } else {
      return output as UseReplitLoading;
    }
  }, [status, error, filePath, replit]);
}
