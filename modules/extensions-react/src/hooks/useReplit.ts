import * as replit from "@replit/extensions";
import {
  connectAtom,
  statusAtom,
  connectionDisposeAtom,
  connectionErrorAtom,
} from "../state/connection";
import { useSet, useValue } from "../state/store";
import React from "react";
import { useFilePath } from "../state/filePath";

/**
 * Returns the handshake status, connection error (if any), filePath, and Replit API wrapper
 */
export function useReplit() {
  const connect = useSet(connectAtom);
  const status = useValue(statusAtom);
  const error = useValue(connectionErrorAtom);
  const { fetchFilePath, filePath } = useFilePath();

  React.useEffect(() => {
    (async () => {
      await connect();
      await fetchFilePath();
    })();

    // TODO: cleanup
  }, [connect, fetchFilePath]);

  return {
    filePath,
    status,
    error,
    replit,
  };
}
