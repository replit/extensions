import { Atom } from "jotai";
import { useAtomValue, useSetAtom, useAtom } from "jotai/react";
import { createStore } from "jotai";
import React from "react";

export const store = createStore();

export const useValue: typeof useAtomValue = (atom: Atom<unknown>) => {
  return useAtomValue(atom, { store });
};

export const useSet: typeof useSetAtom = (atom: any) => {
  return useSetAtom(atom, { store });
};

export const useGet = (atom: Atom<unknown>) => {
  return React.useMemo(() => {
    return store.get(atom);
  }, [store, atom]);
};

export const use: typeof useAtom = (atom: Atom<unknown>) => {
  return useAtom(atom, { store });
};
