import { useState, useEffect, useRef, useMemo } from "react";
import { getHandshakeStatus } from "src/extensions/api/util/talk";
import * as replit from "../extensions/index";
import { HandshakeStatus } from "src/extensions/types";

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
export default function useReplit() {
  const [status, setStatus] = useState<HandshakeStatus>(getHandshakeStatus());
  const [error, setError] = useState<Error | null>(null);
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

    let dispose: (() => void) | null = () => {};

    (async () => {
      try {
        dispose = await replit.init();
        setFilePath(await replit.me.filePath());
        setStatus(HandshakeStatus.Ready);
      } catch (e) {
        setError(e as Error);
        setStatus(HandshakeStatus.Error);
      }
    })();

    return () => {
      dispose?.();
    };
  }, []);

  return useMemo(() => {
    if (status === HandshakeStatus.Ready) {
      return { status, error, filePath, replit } as UseReplitReady;
    } else if (status === HandshakeStatus.Error) {
      return { status, error, filePath, replit: null } as UseReplitFailure;
    } else {
      return { status, error, filePath, replit: null } as UseReplitLoading;
    }
  }, [status, error, filePath, replit]);
}
