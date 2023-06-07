import {
  ExecResult,
  SpawnOptions,
  SpawnOutput,
  SpawnResult,
} from "../types/exec";
import { extensionPort, proxy } from "../util/comlink";

/**
 * Spawns a command, with given arguments and environment variables. Takes in callbacks,
 * and returns an object containing a promise that resolves when the command exits, and
 * a dispose function to kill the process
 */
function spawn(options: SpawnOptions): SpawnOutput {
  let execResult = extensionPort.exec(
    proxy({
      args: options.args,
      env: options.env || {},
      splitStderr: options.splitStderr ?? false,
      onOutput: (output: string) => {
        if (options.splitStderr) {
          options.onStdOut?.(output);
        } else {
          options.onOutput?.(output);
        }
      },
      onStdErr: (stderr: string) => {
        if (options.splitStderr) {
          options.onStdErr?.(stderr);
        } else {
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

  const resultPromise = new Promise<SpawnResult>(async (resolve) => {
    const { exitCode, error } = await (await execResult).promise;

    resolve({
      error,
      exitCode: exitCode ?? 0,
    });
  });

  return {
    resultPromise,
    dispose,
  };
}

/**
 * Executes a command in the shell, with given arguments and environment variables
 */
async function exec(
  command: string,
  options: {
    env?: Record<string, string>;
  } = {}
): Promise<ExecResult> {
  let output = "";
  const { resultPromise } = spawn({
    args: ["bash", "-c", command],
    env: options.env ?? {},
    splitStderr: false,
    onOutput: (newOutput: string) => {
      output += newOutput;
    },
  });

  const result = await resultPromise;

  if (result.error) {
    throw new Error(result.error);
  }

  return {
    output,
    exitCode: result.exitCode,
  };
}

export { spawn, exec };
