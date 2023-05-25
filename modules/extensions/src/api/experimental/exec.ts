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
function executeCommand(
  combinedOutputOptions: CombinedOutputExecOptions
): ExecOutput<CombinedOutputExecResult>;
function executeCommand(
  separatedOutputOptions: SeparatedOutputExecOptions
): ExecOutput<SeparatedOutputExecResult>;
function executeCommand(
  options: CombinedOutputExecOptions | SeparatedOutputExecOptions
): ExecOutput {
  let outputStr: string = "";
  let errorStr: string = "";

  let execResult = extensionPort.experimental.exec(
    proxy({
      args: Array.isArray(options.args)
        ? options.args
        : ["bash", "-c", options.args],
      env: options.env || {},
      splitStderr: options.separateStdErr || false,
      onOutput: (output: string) => {
        outputStr += output;
        if (options.separateStdErr) {
          options.onStdOut?.(output);
        } else {
          options.onOutput?.(output);
        }
      },
      onStdErr: (stderr: string) => {
        if (options.separateStdErr) {
          errorStr += stderr;
          options.onStdErr?.(stderr);
        } else {
          outputStr += stderr;
          options.onOutput?.(stderr);
        }
      },
      onError: (err: string) => {
        throw err;
      },
    })
  );

  let dispose = async () => {
    (await execResult).dispose();
  };

  const resultPromise: Promise<
    SeparatedOutputExecResult | CombinedOutputExecResult
  > = new Promise(async (resolve) => {
    const { exitCode, error } = await (await execResult).promise;

    if (options.separateStdErr) {
      resolve({
        stdOut: outputStr,
        stdErr: errorStr,
        error,
        exitCode: exitCode ?? 0,
      });
    } else {
      resolve({
        error,
        output: outputStr,
        exitCode: exitCode ?? 0,
      });
    }
  });

  return {
    resultPromise,
    dispose,
  };
}

async function exec(
  args: string | Array<string>,
  options: {
    env?: Record<string, string>;
  } = {}
) {
  const { resultPromise } = executeCommand({
    args,
    env: options.env ?? {},
    separateStdErr: true,
  });

  const result = await resultPromise;

  if (result.error) {
    throw new Error(result.error);
  }

  if (result.exitCode !== 0) {
    throw new Error(result.stdErr);
  }

  return result;
}

exec.executeCommand = executeCommand;

export { exec };
