import {
  JsonDataReponse,
  ReplDataInclusion,
  UserDataInclusion,
} from "src/types";
import { extensionPort } from "src/util/comlink";

export const user = {
  async current(args: UserDataInclusion): JsonDataReponse {
    return await extensionPort.currentUser(args);
  },

  async byId(args: { id: string } & UserDataInclusion): JsonDataReponse {
    return await extensionPort.userById(args);
  },

  async byUsername(
    args: { username: string } & UserDataInclusion
  ): JsonDataReponse {
    return await extensionPort.userByUsername(args);
  },
};

export const repl = {
  async current(args: ReplDataInclusion): JsonDataReponse {
    return await extensionPort.currentRepl(args);
  },

  async byId(args: { id: string } & ReplDataInclusion): JsonDataReponse {
    return await extensionPort.replById(args);
  },

  async byUrl(args: { url: string } & ReplDataInclusion): JsonDataReponse {
    return await extensionPort.replByUrl(args);
  },
};
