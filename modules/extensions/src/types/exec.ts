export type OutputStrCallback = (output: string) => void;

export interface BaseSpawnOptions {
  /** The command and arguments, as an array. This does not spawn with a shell */
  args: string[];
  /** any environment variables to add to the execution context */
  env?: Record<string, string>;
  /** whether to keep stdout and standard error outputs separate */
  splitStderr?: boolean;
}

export interface SplitStderrSpawnOptions extends BaseSpawnOptions {
  splitStderr: true;
  /* callback that's triggered when stdout is written to */
  onStdOut?: OutputStrCallback;
  /* callback that's triggered when stderr is written to */
  onStdErr?: OutputStrCallback;
}

export interface CombinedStderrSpawnOptions extends BaseSpawnOptions {
  splitStderr?: false;
  /* callback that's triggered when stdout or stderr are written to */
  onOutput?: (output: string) => void;
}

export type SpawnOptions = SplitStderrSpawnOptions | CombinedStderrSpawnOptions;

export interface SpawnResult {
  exitCode: number;
  error: string | null;
}

export interface SpawnOutput {
  dispose: () => void;
  resultPromise: Promise<SpawnResult>;
}

export interface ExecResult {
  output: string;
  exitCode: number;
}
