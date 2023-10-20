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

export function add({
  id,
  contributions,
}: {
  id: string;
  contributions: Array<string>;
}) {
  const create = (cmdOrCreate: CommandProxy | CreateCommand) => {
    if (typeof cmdOrCreate === "function") {
      registerCreate({ commandId: id, contributions }, cmdOrCreate);
    } else {
      registerCreate({ commandId: id, contributions }, async () => ({
        ...cmdOrCreate,
      }));
    }
  };

  return create;
}
