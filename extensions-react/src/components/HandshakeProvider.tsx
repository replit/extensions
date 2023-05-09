import { HandshakeStatus } from "@replit/extensions";
import * as replit from "@replit/extensions";
import { useEffect, useMemo, useRef, useState } from "react";
import { ReplitContext } from "src/state";
import { UseReplitFailure, UseReplitLoading, UseReplitReady } from "src/types";

/**
 * Provides and establishes the initial handshake between the Replit workspace and your extension.
 */
export function HandshakeProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<HandshakeStatus>(
    HandshakeStatus.Loading
  );
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
        dispose = (await replit.init()).dispose;
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

  const context = useMemo(() => {
    if (status === HandshakeStatus.Ready) {
      return { status, error, filePath, replit } as UseReplitReady;
    } else if (status === HandshakeStatus.Error) {
      return { status, error, filePath, replit: null } as UseReplitFailure;
    } else {
      return { status, error, filePath, replit: null } as UseReplitLoading;
    }
  }, [status, error, filePath, replit]);

  return (
    <ReplitContext.Provider value={context}>{children}</ReplitContext.Provider>
  );
}
