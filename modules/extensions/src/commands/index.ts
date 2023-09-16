import { proxy } from '../util/comlink';

export type Data = Record<string, any>;
export type Commands = () => Promise<Array<ReturnType<typeof Command>>>;
export type Run = () => Promise<void>;

export type CommandArgs = {
  data: Data;
  commands?: Commands;
  run?: Run;
}

export function Command({ data, commands, run }: CommandArgs) {
  let wsCmd: CommandArgs = {
    data,
  };

  if (commands && run) {
    throw new Error("Only one of `commands` or `run` must be defined");
  }

  if (commands) {
    wsCmd.data.type = "context";
    wsCmd.commands = async (...args) => {
      return proxy(await commands(...args));
    };
  } else if (run) {
    wsCmd.data.type = "action";
    wsCmd.run = run;
  }

  return proxy(wsCmd);
}

export type Command = ReturnType<typeof Command>;