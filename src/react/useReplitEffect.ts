import { useLayoutEffect } from "react";
import * as replit from "../index";
import useReplit from "./useReplit";

/**
 * Fires a callback with the Replit API wrapper when its dependency array changes.
 * Similar in functionality to the React useEffect hook.
 */
export default function useReplitEffect(
  callback: (r: typeof replit) => void | Promise<void>,
  dependencies: Array<any>
) {
  const { replit, connected } = useReplit();

  return useLayoutEffect(() => {
    if (replit && connected) {
      callback(replit);
    }
  }, [...dependencies, replit, connected]);
}
