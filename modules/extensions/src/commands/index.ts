import { proxy } from "../util/comlink";

export type Data = Record<string, any>;
export type CommandFnArgs = {
  active: boolean;
  search: string;
  path: SerializableValue[];
};
export type CommandsFn = (
  args: CommandFnArgs
) => Promise<Array<ReturnType<typeof Command>>>;
export type Run = () => Promise<void>;

type SerializableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | SerializableValue[]
  | { [key: string]: SerializableValue };

export type CommandArgs = {
  commands?: CommandsFn;
  run?: Run;
} & { [key: string]: SerializableValue };

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
  const { commands, run, ...props } = cmdArgs;

  let wsCmd = {
    data: {
      ...props,
      type: commands ? "context" : "action",
    },
    commands: commands
      ? async (args: CommandFnArgs) => {
          return proxy(await commands(args));
        }
      : undefined,
    run: run ? run : undefined,
  };

  return proxy(wsCmd);
}

export type Command = ReturnType<typeof Command>;
