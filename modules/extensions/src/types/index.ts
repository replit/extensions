import {
  DirectoryChildNode,
  WatchFileListeners,
  WatchTextFileListeners,
  WatchDirListeners,
} from "./fs";
import {
  UserDataInclusion,
  UserQueryOutput,
  UserByUsernameQueryOutput,
  ReplDataInclusion,
  ReplQueryOutput,
  CurrentUserQueryOutput,
  CurrentUserDataInclusion,
  EditorPreferences,
} from "./data";
import {
  ThemeValuesGlobal,
  ThemeVersion,
  OnThemeChangeValuesListener,
  OnThemeChangeListener,
} from "./themes";
import { OnActiveFileChangeListener } from "./session";
import Comlink from "comlink";

export * from "./fs";
export * from "./themes";
export * from "./data";
export * from "./session";
export * from "./exec";

/**
 * An enumerated set of values for the Handshake between the workspace and an extension
 */
export enum HandshakeStatus {
  Ready = "ready",
  Error = "error",
  Loading = "loading",
}

/**
 * The Replit init() function arguments
 */
export interface ReplitInitArgs {
  timeout?: number;
  debug?: boolean;
}

/**
 * The output of the Replit init() function
 */
export interface ReplitInitOutput {
  dispose: () => void;
  status: HandshakeStatus;
}

/**
 * A cleanup/disposer function (void)
 */
export type DisposerFunction = () => void;

/**
 * The Extension Port
 */
export type ExtensionPortAPI = {
  handshake: () => { success: true };

  // fs Module
  readFile: (
    path: string,
    encoding: "utf8" | "binary" | null
  ) => Promise<
    | { content: string }
    | {
        error: string;
      }
  >;
  writeFile: (
    path: string,
    content: string | Blob
  ) => Promise<
    | { success: boolean }
    | {
        error: string;
      }
  >;
  readDir: (path: string) => Promise<{
    children: Array<DirectoryChildNode>;
    error: string;
  }>;
  createDir: (path: string) => Promise<{
    success: boolean;
    error: string | null;
  }>;
  deleteFile: (path: string) => Promise<
    | {}
    | {
        error: string;
      }
  >;
  deleteDir: (path: string) => Promise<
    | {}
    | {
        error: string;
      }
  >;
  move: (
    path: string,
    to: string
  ) => Promise<{
    success: boolean;
    error: string | null;
  }>;
  copyFile: (
    path: string,
    to: string
  ) => Promise<{
    success: boolean;
    error: string | null;
  }>;
  watchFile: (
    path: string,
    watcher: WatchFileListeners,
    encoding: "utf8" | "binary" | null
  ) => DisposerFunction;
  watchTextFile: (path: string, watcher: WatchTextFileListeners) => () => void;
  watchDir: (path: string, watcher: WatchDirListeners) => DisposerFunction;

  // replDb Module
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) =>
    | {
        error: string | null;
      }
    | string;
  listReplDbKeys: (prefix: string) => Promise<
    | { keys: string[] }
    | {
        error: string;
      }
  >;
  deleteReplDbKey: (key: string) => Promise<void>;

  activatePane: () => Promise<void>;

  // theme
  getCurrentThemeValues: () => Promise<ThemeValuesGlobal>;
  onThemeChangeValues: (
    callback: OnThemeChangeValuesListener
  ) => Promise<DisposerFunction>;
  getCurrentTheme: () => Promise<ThemeVersion>;
  onThemeChange: (callback: OnThemeChangeListener) => Promise<DisposerFunction>;

  filePath: string;

  // messages Module
  showConfirm: (text: string, length?: number) => string;
  showError: (text: string, length?: number) => string;
  showNotice: (text: string, length?: number) => string;
  showWarning: (text: string, length?: number) => string;
  hideMessage: (id: string) => void;
  hideAllMessages: () => void;

  // data Module
  currentUser: (args: CurrentUserDataInclusion) => CurrentUserQueryOutput;
  userById: (args: { id: number } & UserDataInclusion) => UserQueryOutput;
  userByUsername: (
    args: { username: string } & UserDataInclusion
  ) => UserByUsernameQueryOutput;
  currentRepl: (args: ReplDataInclusion) => ReplQueryOutput;
  replById: (args: { id: string } & ReplDataInclusion) => ReplQueryOutput;
  replByUrl: (args: { url: string } & ReplDataInclusion) => ReplQueryOutput;

  // session Module
  watchActiveFile: (callback: OnActiveFileChangeListener) => DisposerFunction;
  getActiveFile: () => Promise<string | null>;

  experimental: ExperimentalAPI;
  internal: InternalAPI;
};

export type ExperimentalAPI = {
  exec: (args: {
    splitStderr?: boolean;
    args: Array<string>;
    env?: {
      [key: string]: string;
    };
    onOutput: (output: string) => void;
    onStdErr: (stderr: string) => void;
    onError: (error: string) => void;
  }) => Promise<{
    dispose: () => void;
    promise: Promise<{
      exitCode: number;
      error: string | null;
    }>;
  }>;

  editor: {
    getPreferences: () => Promise<EditorPreferences>;
  };

  auth: {
    getAuthToken: () => Promise<string>;
  };
};

export type InternalAPI = {};

export type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;

export type RemoteProperty<T> = T extends Function | Comlink.ProxyMarked
  ? Comlink.Remote<T>
  : T extends object
  ? T
  : Promisify<T>; //  We don't want to promisify objects, but we do want to promisify all other primitives

export type RemoteObject<T> = {
  [P in keyof T]: RemoteProperty<T[P]>;
};

export type ExtensionPort = RemoteObject<ExtensionPortAPI>;
