export function getAllFrames() {
  if (!window) {
    throw new Error("getAllFrames() can only be called in a browser");
  }

  if (!window.top) {
    throw new Error("window.top does not exist");
  }

  let frames: Array<Window> = [];
  for (let i = 0; i < window.top.frames.length; i++) {
    let win = window.top.frames[i];
    if (!win) {
      continue;
    }
    
    frames.push(win);
  }

  return frames;
}

export function getExtensionFrames() {
  let allFrames = getAllFrames();
  return allFrames.map((f) => {
    try {
      if (f.location.href) {
        return f;
      }
    } catch (e) {}
  }).filter(Boolean);
}
