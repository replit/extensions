var replit = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.js
  var src_exports = {};
  __export(src_exports, {
    createDirectory: () => createDirectory,
    handshake: () => handshake,
    readDirectory: () => readDirectory,
    readFile: () => readFile,
    readReplInfo: () => readReplInfo,
    readUserInfo: () => readUserInfo,
    writeFile: () => writeFile
  });

  // src/talk.js
  var messageQueue = {};
  async function request(payload) {
    const id = Math.random();
    return new Promise((resolve) => {
      messageQueue[id] = resolve;
      parent.postMessage({
        id,
        payload
      }, "*");
    });
  }

  // src/api/fs.js
  async function readFile(path) {
    return request({
      type: "readFile",
      path
    });
  }
  async function writeFile(path, content) {
    return request({
      type: "writeFile",
      path,
      content
    });
  }
  async function readDirectory(path) {
    return request({
      type: "readDirectory",
      path
    });
  }
  async function createDirectory(path) {
    return request({
      type: "createDirectory",
      path
    });
  }

  // src/api/user.js
  async function readUserInfo() {
    return request({ type: "readUserInfo" });
  }

  // src/api/repl.js
  async function readReplInfo() {
    return request({ type: "readReplInfo" });
  }

  // src/index.js
  async function handshake(permissions) {
    const res = await request({ type: "handshake", permissions });
    return res;
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=index.js.map
