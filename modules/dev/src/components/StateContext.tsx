import React, { createContext } from "react";
import { Test, AppState } from "./";

export const StateContext = createContext<AppState>({
  tests: [],
  setTests: (_) => {},
});

export default function AppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tests, setTests] = React.useState<Array<Test>>([]);

  return (
    <StateContext.Provider value={(tests, setTests)}>
      {children}
    </StateContext.Provider>
  );
}
