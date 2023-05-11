/**
 * The promise result returned by the `exec()` function
 */
export interface ExecResult {
  exitCode: number | null;
  error: string | null;
}

/**
 * Options for the `exec()` function
 */
export interface ExecOptions {
  splitStderr?: boolean;
  args: Array<string>;
  env?: Env;
  onOutput: (output: string) => void;
  onStdErr: (stderr: string) => void;
  onError: (error: Error) => void;
}

/**
 * Custom environment variables for an execution channel
 */
export type Env = {
  [key: string]: string;
};
