export type Pane = {
  type: string;
  id: string;
};

/**
 * Enumeration of file types.
 */
export enum FileType {
  /**
   * A regular file.
   */
  File = "FILE",
  /**
   * A directory/folder
   */
  Directory = "DIRECTORY",
}

/**
 * A base interface for nodes, just includes
 * the type of the node and the path, This interface
 * does not expose the node's content/children
 */
export interface FsNode {
  /**
   * Full path of the node relative to the root
   */
  path: string;

  /**
   * node is a file
   */
  type: FileType;
}

export interface WatchFileWatchers {
  onChange: (newContent: string) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

export interface WatchTextFileWatchers {
  onReady: (readyArgs: { initialContent: string; version: number }) => void;
  onChange: (changeArgs: {
    latestContent: string;
    version: number;
    changeSource: string;
    changes: any; // TODO fix
  }) => void;
  onError: (error: string) => void;
  onMoveOrDelete: (args: {
    eventType: "MOVE" | "DELETE";
    node: FsNode;
  }) => void;
}

export type ExtensionPortAPI = {
  // fs
  readFile: (path: string) => Promise<{ content: string } | { error: string }>;
  writeFile: (
    path: string,
    content: string | Blob
  ) => Promise<{ success: boolean } | { error: string }>;
  readDir: (path: string) => Promise<{
    children: Array<{ filename: string; type: "FILE" | "DIRECTORY" }>;
    error: string;
  }>;
  createDir: (path: string) => Promise<{} | { error: string }>;
  deleteFile: (path: string) => Promise<{} | { error: string }>;
  deleteDir: (path: string) => Promise<{} | { error: string }>;
  move: (path: string, to: string) => Promise<{ error: string | null }>;
  copyFile: (path: string, to: string) => Promise<{ error: string | null }>;
  watchFile: (path: string, watcher: WatchFileWatchers) => () => void;
  watchTextFile: (path: string, watcher: WatchTextFileWatchers) => () => void;

  // replDb
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) => Promise<string | null>;
  listReplDbKeys: (
    prefix: string
  ) => Promise<{ keys: string[] } | { error: string }>;

  // layout
  isPaneTypeVisible: (paneType: string) => Promise<boolean>;
  findPaneByType: (paneType: string) => Promise<{
    paneId: string;
    isHidden: boolean;
    isDialog: boolean;
    type: "tile" | "floating";
    data: any;
  } | null>;
  selectTab: (paneId: string) => Promise<void>;
  insertFloatingPaneIfNotExist(pane: Pane): Promise<void>;
  removeFloatingPanesByType(paneType: string): Promise<void>;
};
