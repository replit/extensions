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

export type Test = (expect: Expectation) => Promise<void>;

export type Expectation = (
  value: any
) => asserts value is Exclude<
  any,
  false | 0 | "" | null | undefined | typeof NaN
>;

export interface TestNamespace {
  module: Module;
  tests: Record<string, Test>;
}

export interface AppState {
  tests: Array<Test>;
  setTests: (tests: Array<Test>) => void;
}
