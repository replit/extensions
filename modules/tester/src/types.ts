import React from "react";
import UnitTests from "./tests";

export type Module =
  | "fs"
  | "me"
  | "data"
  | "editor"
  | "exec"
  | "messages"
  | "replDb"
  | "session"
  | "themes"
  | "actionRequired"
  | "debug";

export interface Test {
  module: Module;
  key: keyof (typeof UnitTests)[Module];
  status: "passed" | "failed" | "loading" | "idle";
  shouldRun: boolean;
}

export interface TestNamespace {
  module: Module;
  tests: TestObject;
}

export type TestObject = Record<
  string,
  (log: (t: string) => void) => Promise<void>
>;

export interface AppState {
  tests: Array<Test>;
  testQueue: Array<Pick<Test, "module" | "key">>;
  setTestQueue: React.Dispatch<
    React.SetStateAction<Array<Pick<Test, "module" | "key">>>
  >;
  logs: Array<string>;
  setLogs: React.Dispatch<React.SetStateAction<Array<string>>>;
  passedTests: number | null;
  setPassedTests: React.Dispatch<React.SetStateAction<number | null>>;
  failedTests: number | null;
  setFailedTests: React.Dispatch<React.SetStateAction<number | null>>;
  totalTests: number | null;
  setTotalTests: React.Dispatch<React.SetStateAction<number | null>>;
}
