import { UserDataInclusion } from "src/types";
import { extensionPort } from "src/util/comlink";

export const user = {
  async current(args: UserDataInclusion) {
    return await extensionPort.currentUser(args);
  },

  async byId(args: { id: string } & UserDataInclusion) {
    return await extensionPort.userById(args);
  },

  async byUsername(args: { username: string } & UserDataInclusion) {
    return await extensionPort.userByUsername(args);
  },
};

export const repl = {
  async current(args: UserDataInclusion) {
    return await extensionPort.currentRepl(args);
  },

  async byId(args: { id: string } & UserDataInclusion) {
    return await extensionPort.replById(args);
  },

  async byUrl(args: { url: string } & UserDataInclusion) {
    return await extensionPort.replByUrl(args);
  },
};
