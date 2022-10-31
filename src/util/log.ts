let debugMode = false;

export function debug(msg: any) {
  if (!debugMode) {
    return;
  }

  console.log(msg);
}

export function setDebugMode(mode: boolean) {
  debugMode = mode;
}
