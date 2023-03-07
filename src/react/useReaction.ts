import { useLayoutEffect } from "react";
import * as replit from "../index";
import useReplit from "./useReplit";

export default function useReaction(
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
