import * as debug from "../api/debug";

const consoleIsPatchedSymbol = Symbol("consoleIsPatched");

export function patchConsole() {
  if (isConsolePatched()) {
    return;
  }

  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  console.log = (...args: any[]) => {
    originalLog(...args);
    debug.log(args[0], { args: args.slice(1) });
  };

  console.warn = (...args: any[]) => {
    originalWarn(...args);
    debug.warn(args[0], { args: args.slice(1) });
  };

  console.error = (...args: any[]) => {
    originalError(...args);
    debug.error(args[0], { args: args.slice(1) });
  };

  console.info = (...args: any[]) => {
    originalInfo(...args);
    debug.info(args[0], { args: args.slice(1) });
  };

  // @ts-ignore
  console[consoleIsPatchedSymbol] = true;
}

export function isConsolePatched() {
  // @ts-ignore
  return Boolean(console[consoleIsPatchedSymbol]);
}
