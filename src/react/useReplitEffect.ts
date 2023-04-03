import { useEffect } from "react";
import * as replit from "../index";
import { HandshakeStatus } from "src/types";
import useReplit from "./useReplit";

/**
 * Fires a callback with the Replit API wrapper when its dependency array changes.
 * Similar in functionality to the React useEffect hook.
 */
export default function useReplitEffect(
  callback: (r: typeof replit) => void | Promise<void>,
  dependencies: Array<any>
) {
  const { replit, status } = useReplit();

  return useEffect(() => {
    if (replit && status === HandshakeStatus.Ready) {
      callback(replit);
    }
  }, [...dependencies, replit, status]);
}
