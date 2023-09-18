import { atom } from "jotai";
import { me } from "@replit/extensions";
import { useSet, useValue } from "./store";
import React from "react";

export const filePathAtom = atom<string | null>(null);

export const setFilePathAtom = atom(null, (_get, set, path: string) => {
  set(filePathAtom, path);
});

export const fetchFilePathAtom = atom(null, async (get, set) => {
  const filePath = await me.filePath();

  set(filePathAtom, filePath);
});

export function useFilePath() {
  const fetchFilePath = useSet(fetchFilePathAtom);
  const filePath = useValue(filePathAtom);

  return React.useMemo(
    () => ({
      filePath,
      fetchFilePath,
    }),
    [filePath, fetchFilePath]
  );
}
