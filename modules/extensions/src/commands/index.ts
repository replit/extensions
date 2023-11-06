import { proxy } from "../util/comlink";

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
   * The first element of the array is the "root" which contains contextual information about the command. It varies depending on the contribution point.
   */
  path: SerializableValue[];
};

export type CommandsFn = (args: CommandFnArgs) => Promise<Array<CommandProxy>>;

export type CreateCommand = (
  args: CommandFnArgs
) => CommandProxy | Promise<CommandProxy>;

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
 * This validates a command. We make sure that exactly one of `commands` or `run` is defined, and every other argument is serializable.
 */
function validateCommand(cmdArgs: unknown): asserts cmdArgs is CommandArgs {
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

export function Command(cmdArgs: CommandArgs) {
  validateCommand(cmdArgs);

  if ("commands" in cmdArgs) {
    const { commands, ...props } = cmdArgs;
    return proxy({
      data: {
        ...props,
        type: "context",
      },
      commands: async (args: CommandFnArgs) => {
        return proxy(await commands(args));
      },
    });
  } else {
    const { run, ...props } = cmdArgs;

    return proxy({
      data: {
        ...props,
        type: "action",
      },
      run,
    });
  }
}

export type CommandProxy = ReturnType<typeof Command>;
