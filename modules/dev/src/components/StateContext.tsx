import React, { createContext } from "react";
import { Test, AppState } from "../types";
import UnitTests from "../tests";

const mappedTests = Object.values(UnitTests)
  .map(({ module, tests }) => {
    return Object.keys(tests).map(
      (key) =>
        ({
          module,
          key,
          status: "idle",
          shouldRun: false,
        } as Test)
    );
  })
  .flat(1)
  .sort((a, b) => a.module.localeCompare(b.module));

export const StateContext = createContext<AppState | null>(null);

export const useAppState = () => {
  const state = React.useContext(StateContext);

  if (!state) {
    throw new Error("useAppState must be used within a StateProvider");
  }

  return state;
};

export default function AppStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [testQueue, setTestQueue] = React.useState<
    Array<Pick<Test, "module" | "key">>
  >([]);
  const [logs, setLogs] = React.useState<Array<string>>([]);
  const [passedTests, setPassedTests] = React.useState<number | null>(null);
  const [failedTests, setFailedTests] = React.useState<number | null>(null);
  const [totalTests, setTotalTests] = React.useState<number | null>(null);

  return (
    <StateContext.Provider
      value={{
        tests: mappedTests,
        testQueue,
        setTestQueue,
        logs,
        setLogs,
        passedTests,
        setPassedTests,
        failedTests,
        setFailedTests,
        totalTests,
        setTotalTests,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
