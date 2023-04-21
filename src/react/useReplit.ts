import { useState, useEffect, useRef, useMemo } from "react";
import { getHandshakeStatus } from "src/util/handshake";
import * as replit from "../index";
import { HandshakeStatus } from "src/types";

export interface UseReplitReady {
  status: HandshakeStatus.Ready;
  error: null;
  filePath: string;
  replit: typeof replit;
}

export interface UseReplitLoading {
  status: HandshakeStatus.Loading;
  error: null;
  filePath: null;
  replit: null;
}

export interface UseReplitFailure {
  status: HandshakeStatus.Error;
  error: Error;
  filePath: null;
  replit: null;
}

/**
 * A React hook that initializes and passes the Replit API wrapper to a component.
 */
export function useReplit() {
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

    let dispose: () => void = () => {};

    (async () => {
      try {
        dispose = (await replit.init()).dispose;
        setFilePath(await replit.me.filePath());
      } catch (e) {
        setError(e as Error);
        setStatus(HandshakeStatus.Error);
      }
    })();

    return () => {
      dispose();
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
