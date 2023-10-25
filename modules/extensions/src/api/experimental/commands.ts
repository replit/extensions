import { extensionPort } from "../../util/comlink";
import { CommandProxy } from "../../commands";

export function register(command: CommandProxy): void {
  extensionPort.experimental.commands.registerCommand(command);
}
