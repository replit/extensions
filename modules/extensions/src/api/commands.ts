import { extensionPort, proxy } from "../util/comlink";
import {
  CreateCommand,
  CommandProxy,
  ContributionType,
  Command,
  CommandFnArgs,
  CommandSymbol,
  CommandArgs,
  isCommandProxy,
} from "../commands";

export interface AddCommandArgs {
  /**
   * The command's unique identifier. This is used to identify the command in Replit's command system
   */
  id: string;

  /**
   * The surfaces that this command should appear in. This is an array of strings
   */
  contributions: Array<ContributionType>;

  /**
   * A Command, or, a function that returns a Command.
   */
  command: CommandProxy | CreateCommand;
}

/**
 * Adds a command to the command system.
 *
 * @param id The command's unique identifier. This is used to identify the command in Replit's command system
 * @param contributions The surfaces that this command should appear in. This is an array of strings
 * @param command A Command, or, a function that returns a Command.
 */
export function add({ id, contributions, command }: AddCommandArgs) {
  if (typeof command === "function") {
    let createCommand = proxy(async (cmdFnArgs: CommandFnArgs) => {
      const cmd = await command(cmdFnArgs);

      if (!cmd) {
        return null;
      }

      return isCommandProxy(cmd) ? cmd : Command(cmd);
    });

    extensionPort.commands.registerCreateCommand(
      { commandId: id, contributions },
      createCommand
    );
  } else {
    let createCommand = proxy(async () => {
      return isCommandProxy(command) ? command : Command(command);
    });

    extensionPort.commands.registerCreateCommand(
      { commandId: id, contributions },
      createCommand
    );
  }
}

/**
 * @deprecated Use `add` instead
 */
export function register(command: CommandProxy): void {
  extensionPort.commands.registerCommand(command);
}

/**
 * @deprecated Use `add` instead
 */
export function registerCreate(
  data: { commandId: string; contributions: Array<string> },
  createCommand: CreateCommand
): void {
  extensionPort.commands.registerCreateCommand(
    data,
    async (args: CommandFnArgs) => {
      const cmd = await createCommand(args);

      if (!cmd) {
        return null;
      }

      return isCommandProxy(cmd) ? cmd : Command(cmd);
    }
  );
}
