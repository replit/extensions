import { extensionPort, proxy } from "../util/comlink";
import {
  CombinedOutputExecOptions,
  CombinedOutputExecResult,
  SeparatedOutputExecOptions,
  SeparatedOutputExecResult,
} from "../types";

export async function exec(
  combinedOutputOptions: CombinedOutputExecOptions
): Promise<CombinedOutputExecResult>;
export async function exec(
  separatedOutputOptions: SeparatedOutputExecOptions
): Promise<SeparatedOutputExecResult>;
export async function exec(
  options: CombinedOutputExecOptions | SeparatedOutputExecOptions
): Promise<SeparatedOutputExecResult | CombinedOutputExecResult> {
  let outputStr: string = "";
  let errorStr: string = "";
  let exitCode: string = "";

  const { promise } = await extensionPort.experimental.exec(
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
        exitCode = err.message.match(/[0-9]+/)?.[0] || "";
      },
    })
  );

  await promise;

  if (options.separateStdErr) {
    return {
      output: outputStr,
      error: errorStr,
      exitError: exitCode || null,
    };
  } else {
    return {
      output: outputStr,
      exitError: exitCode || null,
    };
  }
}
