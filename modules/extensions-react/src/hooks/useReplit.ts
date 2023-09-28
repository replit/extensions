import * as replit from "@replit/extensions";
import { HandshakeStatus } from "@replit/extensions";
import {
  connectAtom,
  statusAtom,
  connectionDisposeAtom,
  connectionErrorAtom,
} from "../state/connection";
import { useSet, useValue } from "../state/store";
import React from "react";
import { useFilePath } from "../state/filePath";
import { UseReplitFailure, UseReplitLoading, UseReplitReady } from "../types";

type UseReplitValue = UseReplitReady | UseReplitLoading | UseReplitFailure;

/**
 * Returns the handshake status, connection error (if any), filePath, and Replit API wrapper
 */
export function useReplit(): UseReplitValue {
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

  if (status === HandshakeStatus.Loading) {
    return {
      status,
      error: null,
      filePath: null,
      replit,
    };
  }

  if (status === HandshakeStatus.Error) {
    return {
      status,
      error: error || new Error("Unknown handshake error"),
      filePath: null,
      replit,
    };
  }

  const res: UseReplitReady = {
    filePath,
    status,
    error: null,
    replit,
  };

  return res;
}
