import { useEffect } from "react";
import { HandshakeStatus } from "@replit/extensions";
import type * as replit from "@replit/extensions";
import { useReplit } from "./useReplit";

/**
 * Fires a callback with the Replit API wrapper when its dependency array changes.
 * Similar in functionality to the React useEffect hook, supports cleanup disposers.
 */
export default function useReplitEffect(
  callback: (
    r: typeof replit
  ) => void | Promise<void> | (() => void) | Promise<() => void>,
  dependencies: Array<any>
) {
  const { replit, status } = useReplit();

  return useEffect(() => {
    if (replit && status === HandshakeStatus.Ready) {
      const dispose = callback(replit);

      if (typeof dispose === "function") {
        return () => {
          dispose();
        };
      }
    }
  }, [...dependencies, replit, status]);
}
