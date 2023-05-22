import {
  ReplDataInclusion,
  UserDataInclusion,
  CurrentUserDataInclusion,
} from "../types";
import { extensionPort } from "../util/comlink";

/**
 * Fetches the current user via graphql
 */
export async function currentUser(args?: CurrentUserDataInclusion) {
  return await extensionPort.currentUser(args || {});
}

/**
 * Fetches a user by their id via graphql
 */
export async function userById(args: { id: number } & UserDataInclusion) {
  if (typeof args.id !== "number") {
    throw new Error(
      `Query parameter "id" must be a number.  Found type ${typeof args.id} instead.`
    );
  }

  return await extensionPort.userById(args);
}

/**
 * Fetches a user by their username via graphql
 */
export async function userByUsername(
  args: { username: string } & UserDataInclusion
) {
  if (typeof args.username !== "string") {
    throw new Error(
      `Query parameter "username" must be a string.  Found type ${typeof args.username} instead.`
    );
  }

  return await extensionPort.userByUsername(args);
}

/**
 * Fetches the current Repl via graphql
 */
export async function currentRepl(args?: ReplDataInclusion) {
  return await extensionPort.currentRepl(args || {});
}

/**
 * Fetches a Repl by its ID via graphql
 */
export async function replById(args: { id: string } & ReplDataInclusion) {
  if (typeof args.id !== "string") {
    throw new Error(
      `Query parameter "id" must be a string.  Found type ${typeof args.id} instead.`
    );
  }

  return await extensionPort.replById(args);
}

/**
 * Fetches a Repl by its URL via graphql
 */
export async function replByUrl(args: { url: string } & ReplDataInclusion) {
  if (typeof args.url !== "string") {
    throw new Error(
      `Query parameter "url" must be a string.  Found type ${typeof args.url} instead.`
    );
  }

  return await extensionPort.replByUrl(args);
}
