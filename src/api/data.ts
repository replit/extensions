import {
  JsonDataReponse,
  ReplDataInclusion,
  UserDataInclusion,
} from "src/types";
import { extensionPort } from "src/util/comlink";

export async function currentUser(args: UserDataInclusion): JsonDataReponse {
  return await extensionPort.currentUser(args);
}

export async function userById(
  args: { id: string } & UserDataInclusion
): JsonDataReponse {
  return await extensionPort.userById(args);
}

export async function userByUsername(
  args: { username: string } & UserDataInclusion
): JsonDataReponse {
  return await extensionPort.userByUsername(args);
}

export async function currentRepl(args: ReplDataInclusion): JsonDataReponse {
  return await extensionPort.currentRepl(args);
}

export async function replById(
  args: { id: string } & ReplDataInclusion
): JsonDataReponse {
  return await extensionPort.replById(args);
}

export async function replByUrl(
  args: { url: string } & ReplDataInclusion
): JsonDataReponse {
  return await extensionPort.replByUrl(args);
}
