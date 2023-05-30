export type OutputStrCallback = (output: string) => void;

export type BaseSpawnOptions = {
  /** The command and arguments, as an array. This does not spawn with a shell */
  args: string[];
  /** any environment variables to add to the execution context */
  env?: Record<string, string>;
  /** whether to keep stdout and standard error outputs separate */
  splitStderr?: boolean;
};

export type SplitStderrSpawnOptions = BaseSpawnOptions & {
  splitStderr: true;
  /* callback that's triggered when stdout is written to */
  onStdOut?: OutputStrCallback;
  /* callback that's triggered when stderr is written to */
  onStdErr?: OutputStrCallback;
};

export type CombinedStderrSpawnOptions = BaseSpawnOptions & {
  splitStderr?: false;
  /* callback that's triggered when stdout or stderr are written to */
  onOutput?: (output: string) => void;
};

export type SpawnOptions = SplitStderrSpawnOptions | CombinedStderrSpawnOptions;

export type SpawnResult = {
  exitCode: number;
  error: string | null;
};

export type SpawnOutput = {
  dispose: () => void;
  resultPromise: Promise<SpawnResult>;
};

export type ExecResult = {
  output: string;
  exitCode: number;
};
