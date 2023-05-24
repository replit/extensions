import { extensionPort, proxy } from "../../util/comlink";
import {
  CombinedOutputExecOptions,
  CombinedOutputExecResult,
  ExecOutput,
  SeparatedOutputExecOptions,
  SeparatedOutputExecResult,
} from "../../types";

/**
 * Executes arbitrary shell commands, with given arguments and environment variables
 */
export async function exec(
  combinedOutputOptions: CombinedOutputExecOptions
): Promise<ExecOutput<CombinedOutputExecResult>>;
export async function exec(
  separatedOutputOptions: SeparatedOutputExecOptions
): Promise<ExecOutput<SeparatedOutputExecResult>>;
export async function exec(
  options: CombinedOutputExecOptions | SeparatedOutputExecOptions
): Promise<ExecOutput> {
  let outputStr: string = "";
  let errorStr: string = "";
  //let exitCode: string = "";

  const { promise, dispose } = await extensionPort.experimental.exec(
    proxy({
      args: Array.isArray(options.args)
        ? options.args
        : ["bash", "-c", options.args],
      env: options.env || {},
      splitStderr: options.separateStdErr || false,
      onOutput: (output: string) => {
        outputStr += output;
        if (options.separateStdErr) {
          options.onStdOutOutput?.(output);
        } else {
          options.onOutput?.(output);
        }
      },
      onStdErr: (stderr: string) => {
        if (options.separateStdErr) {
          errorStr += stderr;
          options.onStdErrOutput?.(stderr);
        } else {
          outputStr += stderr;
          options.onOutput?.(stderr);
        }
      },
      onError: (err: Error) => {
        throw err;
      },
    })
  );

  const result: Promise<SeparatedOutputExecResult | CombinedOutputExecResult> =
    new Promise((resolve) => {
      promise.then(({ exitCode, error }) => {
        if (options.separateStdErr) {
          resolve({
            stdOut: outputStr,
            stdErr: errorStr,
            error,
            exitCode: exitCode || 0,
          });
        } else {
          resolve({
            error,
            output: outputStr,
            exitCode: exitCode || 0,
          });
        }
      });
    });

  return {
    result,
    dispose,
  };
}
