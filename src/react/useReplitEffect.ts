import { useEffect } from 'react';
import * as replit from "../index";
import useReplit from './useReplit';

export default function useReplitEffect(
  callback: (r: typeof replit) => void | Promise<void>,
  dependencies: Array<any>
) {
  const { replit, connected } = useReplit();

  if (replit && connected) {
    return useEffect(() => {
      callback(replit);
    }, [dependencies, replit]);
  }

  return useEffect(() => {}, [dependencies, replit]);
}