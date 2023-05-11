import { extensionPort, proxy } from "../util/comlink";
import { ExecArgs } from "../types";

export default async function exec({
  splitStderr,
  args,
  env,
  onOutput = () => {},
  onStdErr = () => {},
  onError = () => {},
  onEnd = () => {},
}: ExecArgs): Promise<() => void> {
  let outputStr: string = "";

  // TODO: Make dispose() not cause a BSOD after being called immediately
  const { dispose, promise } = await extensionPort.experimental.exec(
    proxy({
      args: Array.isArray(args) ? args : ["bash", "-c", args],
      env,
      splitStderr,
      onOutput: (output: string) => {
        outputStr += output;
        onOutput(output);
      },
      onStdErr: (stderr: string) => {
        onStdErr(stderr);
      },
      onError: (err: Error) => {
        onError(err);
      },
    })
  );

  promise.then((res) => {
    onEnd({
      ...res,
      output: outputStr,
    });
    dispose();
  });

  return () => {
    dispose();
  };
}
