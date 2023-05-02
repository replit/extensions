import {
  DirectoryChildNode,
  WatchFileListeners,
  WatchTextFileListeners,
  WatchDirListeners,
  RequestOptions,
  ExecResult,
} from "./fs";
import {
  UserDataInclusion,
  UserQueryOutput,
  UserByUsernameQueryOutput,
  ReplDataInclusion,
  ReplQueryOutput,
} from "./data";
import {
  ThemeValuesGlobal,
  ThemeVersion,
  OnThemeChangeValuesListener,
  OnThemeChangeListener,
} from "./themes";
import { OnActiveFileChangeListener } from "./session";

export * from "./fs";
export * from "./themes";
export * from "./data";
export * from "./session";

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
  createDir: (path: string) => Promise<
    | {}
    | {
        error: string;
      }
  >;
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
    error: string | null;
  }>;
  copyFile: (
    path: string,
    to: string
  ) => Promise<{
    error: string | null;
  }>;
  watchFile: (path: string, watcher: WatchFileListeners) => DisposerFunction;
  watchTextFile: (path: string, watcher: WatchTextFileListeners) => () => void;
  watchDir: (path: string, watcher: WatchDirListeners) => DisposerFunction;

  // replDb Module
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) => {
    error: string | null;
  };
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
  currentUser: (args: UserDataInclusion) => UserQueryOutput;
  userById: (args: { id: string } & UserDataInclusion) => UserQueryOutput;
  userByUsername: (
    args: { username: string } & UserDataInclusion
  ) => UserByUsernameQueryOutput;
  currentRepl: (args: ReplDataInclusion) => ReplQueryOutput;
  replById: (args: { id: string } & ReplDataInclusion) => ReplQueryOutput;
  replByUrl: (args: { url: string } & ReplDataInclusion) => ReplQueryOutput;

  // session Module
  watchActiveFile: (callback: OnActiveFileChangeListener) => DisposerFunction;
  getActiveFile: () => Promise<string | null>;
  exec: (args: RequestOptions) => Promise<ExecResult>;
};
