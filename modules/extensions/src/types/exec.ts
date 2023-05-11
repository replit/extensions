/**
 * The promise result returned by the `exec()` function
 */
export interface ExecResult {
  exitCode: number | null;
  error: string | null;
}

/**
 * Custom environment variables for an execution channel
 */
export type Env = {
  [key: string]: string;
};

/**
 * Options for the `exec()` function.
 * `splitStderr` - Whether to seperate stderr from stdout
 * `env` - Optional. Whether to add custom environment variables to this execution channel
 * `args` - The arguments to execute.  Can be a string or an array of strings.
 * `onOutput` - Callback for when the output of the command is streamed.
 * `onStdErr` - Callback for when the stderr of the command is streamed.
 * `onError` - Callback for when the command errors.
 * `onEnd` - Callback for when the command ends.
 */
export interface ExecArgs {
  splitStderr?: boolean;
  env?: Env;
  args: Array<string> | string;
  onOutput?: (output: string) => void;
  onStdErr?: (stderr: string) => void;
  onError?: (error: Error) => void;
  onEnd?: (
    res: ExecResult & {
      output: string;
    }
  ) => void;
}

/**
 * Options for the replit-web exec function
 */
export interface ExecOptions {
  splitStderr?: boolean;
  args: Array<string> | string;
  env?: Env;
  onOutput?: (output: string) => void;
  onStdErr?: (stderr: string) => void;
  onError?: (error: Error) => void;
}
