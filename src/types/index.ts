export type Pane = {
  type: string;
  id: string;
};

export interface WatchFileWatchers {
  onChange: (newContent: string) => void;
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
  watchFile: (path: string, watcher: WatchFileWatchers) => (() => void);

  // replDb
  setReplDbValue: (key: string, value: string) => Promise<void>;
  getReplDbValue: (key: string) => Promise<string | null>;
  listReplDbKeys: (
    prefix: string
  ) => Promise<{ keys: string[] } | { error: string }>;

  // layout
  isPaneTypeVisible: (paneType: string) => Promise<boolean>;
  findPaneByType: (
    paneType: string
  ) => Promise<{
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
