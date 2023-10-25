import { extensionPort } from "../../util/comlink";
import { CreateCommand, CommandProxy, Command } from "../../commands";

export function register(command: CommandProxy): void {
  extensionPort.experimental.commands.registerCommand(command);
}

export function registerCreate(
  data: { commandId: string; contributions: Array<string> },
  createCommand: CreateCommand
): void {
  extensionPort.experimental.commands.registerCreateCommand(
    data,
    createCommand
  );
}

interface AddCommandArgs {
  /**
   * The command's unique identifier. This is used to identify the command in Replit's command system
   */
  id: string,

  /**
   * The surfaces that this command should appear in. This is an array of strings
   */
  contributions: Array<string>,

  /**
   * A Command, or, a function that returns a Command.
   */
  command: CommandProxy | CreateCommand;
}

export function add({
  id,
  contributions,
  command,
}: AddCommandArgs) {
  if (typeof command === "function") {
    registerCreate({ commandId: id, contributions }, command);
  } else {
    registerCreate({ commandId: id, contributions }, async () => ({
      ...command,
    }));
  }
}
