/**
 * A shell execution request.  Keywords/arguments should be separated into array items in `args`.
 *
 * `env` can be used to set custom/temporary environment variables when running the particular command.
 */
export interface RequestOptions {
  args: Array<string>;
  env?: Record<string, string>;
}

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
 * Execution args
 */
export interface ExecArgs {
  args: string | Array<string>;
  env?: Record<string, string>;
  onOutput?: (output: string) => void;
  onError?: (error: string) => void;
}
