export type Module =
  | "fs"
  | "me"
  | "data"
  | "editor"
  | "exec"
  | "messages"
  | "replDb"
  | "session"
  | "themes";

export interface Test {
  module: Module;
  key: string;
  status: "passed" | "failed" | "loading" | "idle";
}

export type Expectation = (
  value: any
) => asserts value is Exclude<
  any,
  false | 0 | "" | null | undefined | typeof NaN
>;

export interface TestNamespace {
  module: Module;
  tests: Record<string, () => Promise<void> | void>;
}

export interface AppState {
  tests: Array<Test>;
  setTests: (tests: Array<Test>) => void;
}
