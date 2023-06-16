import { DisposerFunction, exec, SpawnResult } from "@replit/extensions";
import { useRef, useState } from "react";

/**
 * Output for the useExecStream hook for a combined output stream.
 */
export interface UseExecStreamOutputSeparated {
  stdout: string;
  stderr: string;
  exit: DisposerFunction;
  exec: (command: Array<string> | string) => void;
  running: boolean;
}

/**
 * Output for the useExecStream hook for a combined output stream.
 */
export interface UseExecStreamOutputCombined {
  output: string;
  exit: DisposerFunction;
  exec: (command: Array<string> | string) => void;
  running: boolean;
}

/**
 * Output for onComplete in useExecStream args for a separated output.
 */
export interface UseExecOnCompleteArgsCombined extends SpawnResult {
  output: string;
}

/** Output for onComplete in useExecStream args for a separated output. */
export interface UseExecOnCompleteArgsSeparated extends SpawnResult {
  stdout: string;
  stderr: string;
}

/**
 * Args for the useExecStream hook for a separated output stream.
 */
export interface UseExecStreamArgsSeparated {
  env?: Record<string, any>;
  onComplete?: (data: UseExecOnCompleteArgsSeparated) => void;
  splitStderr: true;
}

/**
 * Args for the useExecStream hook for a combined output stream.
 */
export interface UseExecStreamArgsCombined {
  env?: Record<string, any>;
  onComplete?: (data: UseExecOnCompleteArgsCombined) => void;
  splitStderr?: false;
}

/**
 * The useExecStream hook runs shell commands using the Replit Extensions API and provides a way to handle the output, track execution status, and stop the process.
 */
export function useExecStream(
  args: UseExecStreamArgsCombined
): UseExecStreamOutputCombined;
export function useExecStream(
  args: UseExecStreamArgsSeparated
): UseExecStreamOutputSeparated;
export function useExecStream(
  args?: UseExecStreamArgsCombined | UseExecStreamArgsSeparated
) {
  const exitRef = useRef<DisposerFunction>(() => {});
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [stdout, setStdout] = useState<string>("");
  const [stderr, setStderr] = useState<string>("");

  const execute = (command: Array<string> | string) => {
    if (running) {
      throw new Error(
        "Existing process already running.  Please use another useExec() hook to run more than one shell stream at once."
      );
    }

    setOutput("");
    setStdout("");
    setStderr("");
    setRunning(true);

    const execArgs = Array.isArray(command) ? command : ["bash", "-c", command];
    let outputTemp = "";
    let stdoutTemp = "";
    let stderrTemp = "";

    if (args?.splitStderr) {
      const { dispose, resultPromise } = exec.spawn({
        splitStderr: args?.splitStderr,
        env: args?.env || {},
        args: execArgs,
        onStdOut: (out) => {
          stdoutTemp += out;
          setStdout((o) => o + out);
        },
        onStdErr: (err) => {
          stderrTemp += err;
          setStderr((o) => o + err);
        },
      });
      exitRef.current = () => {
        setRunning(false);
        dispose();
      };
      resultPromise.then((data) => {
        args?.onComplete?.({
          ...data,
          stdout: stdoutTemp,
          stderr: stderrTemp,
        });
        setRunning(false);
      });
    } else {
      const { dispose, resultPromise } = exec.spawn({
        splitStderr: args?.splitStderr,
        env: args?.env || {},
        args: execArgs,
        onOutput: (out) => {
          outputTemp += out;
          setOutput((o) => o + out);
        },
      });
      exitRef.current = () => {
        setRunning(false);
        dispose();
      };
      resultPromise.then((data) => {
        args?.onComplete?.({
          ...data,
          output: outputTemp,
        });
        setRunning(false);
      });
    }
  };

  if (args?.splitStderr) {
    return {
      exit: exitRef.current,
      exec: execute,
      running,
      stdout,
      stderr,
    } as UseExecStreamOutputSeparated;
  } else {
    return {
      output,
      exit: exitRef.current,
      exec: execute,
      running,
    } as UseExecStreamOutputCombined;
  }
}
