import { ProxyMarked } from "comlink";
import { proxy } from "../util/comlink";

/**
 * Surfaces that a command can appear in.
 */
export enum ContributionType {
  CommandBar = "commandbar",
  FiletreeContextMenu = "filetree-context-menu",
  SidebarSearch = "sidebar-search",
  EditorContextMenu = "editor-context-menu",
}

export type CommandFnArgs = {
  /**
   * Whether the command is currently active. That is, the user has selected this command in the command bar.
   *
   * Subcommands are computed even if the command is not active, so that the command bar can show people helpful suggestions of what they can do next
   */
  active: boolean;

  /**
   * The current search query. This is the text that the user has typed into the command bar.
   */
  search: string;

  /**
   * The current path. This is the path of commands that the user has selected in the command bar.
   *
   * The first element of the array is the "root" which contains contextual information about the command. It varies depending on the surface.
   */
  path: SerializableValue[];
};

export type CommandsFn = (
  args: CommandFnArgs
) => Promise<Array<CommandProxy | CommandArgs>>;

export type CreateCommand = (
  args: CommandFnArgs
) =>
  | CommandProxy
  | Promise<CommandProxy>
  | CommandArgs
  | Promise<CommandArgs>
  | null;

export type Run = () => any;

export type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableValue[]
  | { [key: string]: SerializableValue };

export type BaseCommandArgs = {
  /**
   * The command's label. This is the primary text that represents your command in the Commandbar.
   */
  label: string;

  /**
   * The command's description. This is the secondary text that appears next to the label in the Commandbar.
   */
  description?: string;

  /**
   * The command's icon. This is a relative path to the icon that will be displayed next to the label in the Commandbar.
   *
   * For example, if `public` is your statically served directory and you have an icon at `./public/icons/cmd.svg`, you would set this to `/icons/cmd.svg`
   */
  icon?: string;
};

export type ActionCommandArgs = BaseCommandArgs & {
  /**
   * The function that will be called when someone choses to run this command.
   */
  run: Run;
};

export type ContextCommandArgs = BaseCommandArgs & {
  /**
   * The function that will be called to compute 'subcommands' for this command. The subcommands can be any number of commands,
   * and even computed dynamically in response to the different arguments passed to this function or some other external state.
   */
  commands: CommandsFn;
};

export type CommandArgs = ActionCommandArgs | ContextCommandArgs;

/**
 * This validates a CommandArgs object. We make sure that exactly one of `commands` or `run` is defined, and every other argument is serializable.
 */
function validateCommandArgs(cmdArgs: unknown): asserts cmdArgs is CommandArgs {
  // Make sure cmdArgs is object
  if (typeof cmdArgs !== "object") {
    throw new Error("Command arguments must be an object");
  }
  if (cmdArgs === null) {
    throw new Error("Command arguments must not be null");
  }

  // Make sure it contains `commands` or `run`
  if (!("commands" in cmdArgs) && !("run" in cmdArgs)) {
    throw new Error("One of `commands` or `run` must be defined");
  }

  // But not both
  if (
    "commands" in cmdArgs &&
    cmdArgs.commands &&
    "run" in cmdArgs &&
    cmdArgs.run
  ) {
    throw new Error("Only one of `commands` or `run` must be defined");
  }

  // And when provided, they must always be a function
  if ("commands" in cmdArgs && typeof cmdArgs.commands !== "function") {
    throw new Error("`commands` must be a function");
  }

  if ("run" in cmdArgs && typeof cmdArgs.run !== "function") {
    throw new Error("`run` must be a function");
  }

  // Make sure all other arguments are serializable
  for (let entry of Object.entries(cmdArgs)) {
    if (entry[0] === "commands" || entry[0] === "run") {
      continue;
    }

    try {
      JSON.stringify({ [entry[0]]: entry[1] });
    } catch (e) {
      throw new Error(`Command argument '${entry[0]}' is not serializable`);
    }
  }
}

export const CommandSymbol = Symbol("Command");

export function isCommandProxy(cmd: object): cmd is CommandProxy {
  return CommandSymbol in cmd && cmd[CommandSymbol] === true;
}

/**
 * This function validates a command and wraps it in a proxy so that it can be sent over the wire
 *
 * It:
 * - Validates the command's arguments, separates serializable and non-serializable arguments
 * - Wraps the command in a proxy so that it can be sent over the wire
 * - Wraps the command's `commands` function to ensure that all subcommands are also Command() wrapped
 * - Adds a symbol to the command to identify a wrapped command
 */
export function Command(cmdArgs: CommandArgs): CommandProxy {
  // If the command is already wrapped, just return it.
  // This is to prevent accidental double-wrapping
  if (isCommandProxy(cmdArgs)) {
    throw new Error("Command is already wrapped");
  }

  // Validate the command's arguments
  validateCommandArgs(cmdArgs);

  if ("commands" in cmdArgs) {
    const { commands, ...props } = cmdArgs;

    let cmdProxy: CommandProxy = proxy({
      data: {
        ...props,
        type: "context",
      },
      commands: async (args: CommandFnArgs) => {
        // Compute subcommands
        let subCmds = await commands(args);

        // While we expect commands() to return an array, we don't want to throw an error if it doesn't.
        if (!subCmds || !Array.isArray(subCmds)) {
          return proxy([]);
        }

        const commandProxyArray: Array<CommandProxy> = subCmds.map((subCmd) => {
          // Subcommands can be either a CommandArgs or a CommandProxy.
          // If it's already a wrapped command, just return it.
          if (isCommandProxy(subCmd)) {
            return subCmd;
          }

          // Otherwise, wrap it in Command()
          return Command(subCmd);
        });

        // Return the subcommands as a proxy array
        return proxy(commandProxyArray);
      },

      // Attach CommandSymbol to identify a wrapped command
      [CommandSymbol]: true,
    });

    return cmdProxy;
  } else {
    const { run, ...props } = cmdArgs;

    let cmdProxy: CommandProxy = proxy({
      data: {
        ...props,
        type: "action",
      },
      run,
      // Attach CommandSymbol to identify a wrapped command
      [CommandSymbol]: true,
    });

    return cmdProxy;
  }
}

export type CommandProxy =
  | ({
      data: {
        type: "action";
        label: string;
        description?: string;
        icon?: string;
      };
      run?: Run;
    } & ProxyMarked & { [CommandSymbol]: true })
  | ({
      data: {
        type: "context";
        label: string;
        description?: string;
        icon?: string;
      };
      commands?: (args: CommandFnArgs) => Promise<Array<CommandProxy>>;
    } & ProxyMarked & { [CommandSymbol]: true });
