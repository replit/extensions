import { extensionPort } from '../../util/comlink';
import { Command } from '../../commands';

export function register(
  command: Command,
): void {
  extensionPort.experimental.commands.registerCommand(command);
}
