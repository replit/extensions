import {
  ReplDataInclusion,
  UserDataInclusion,
  CurrentUserDataInclusion,
} from "../types";
import { extensionPort } from "../util/comlink";

/**
 * Fetches the current user via graphql
 */
export async function currentUser(args: CurrentUserDataInclusion) {
  return await extensionPort.currentUser(args);
}

/**
 * Fetches a user by their id via graphql
 */
export async function userById(args: { id: string } & UserDataInclusion) {
  return await extensionPort.userById(args);
}

/**
 * Fetches a user by their username via graphql
 */
export async function userByUsername(
  args: { username: string } & UserDataInclusion
) {
  return await extensionPort.userByUsername(args);
}

/**
 * Fetches the current Repl via graphql
 */
export async function currentRepl(args: ReplDataInclusion) {
  return await extensionPort.currentRepl(args);
}

/**
 * Fetches a Repl by its ID via graphql
 */
export async function replById(args: { id: string } & ReplDataInclusion) {
  return await extensionPort.replById(args);
}

/**
 * Fetches a Repl by its URL via graphql
 */
export async function replByUrl(args: { url: string } & ReplDataInclusion) {
  return await extensionPort.replByUrl(args);
}
