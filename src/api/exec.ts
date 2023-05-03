import { ExecResult, RequestOptions } from "src/types/exec";
import { extensionPort } from "src/util/comlink";

/**
 * Executes a command in the shell.
 */
export async function exec(args: RequestOptions): Promise<ExecResult> {
  return await extensionPort.exec(args);
}
