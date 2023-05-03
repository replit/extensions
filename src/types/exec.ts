/**
 * A successful shell command execution
 */
export interface ExecSuccess {
  output: string;
  error: null;
}

/**
 * A failed shell command execution
 */
export interface ExecError {
  output: null | string;
  error: string;
}

/**
 * A shell command execution result
 */
export type ExecResult = ExecSuccess | ExecError;

/**
 * Options for the `exec()` function.
 *
 * `args` - a string, or an array of strings, each representing a command line argument
 * `env` - an object containing environment variables to be set for the command
 * `onOutput` - a callback to handle streamed stdout
 * `onError` - a callback to handle stderr
 */
export interface ExecArgs {
  args: string | Array<string>;
  env?: Record<string, string>;
  onOutput?: (output: string) => void;
  onError?: (error: string) => void;
}
