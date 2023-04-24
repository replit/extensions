/**
 * A Filesystem node type
 */
export enum FsNodeType {
  File = "FILE",
  Directory = "DIRECTORY",
}

/**
 * A base interface for nodes, just includes
 * the type of the node and the path, This interface
 * does not expose the node's content/children
 */
export interface FsNode {
  path: string;
  type: FsNodeType;
}

/**
 * A directory child node - a file or a folder.
 */
export interface DirectoryChildNode {
  filename: string;
  type: FsNodeType;
}

/**
 * A file change event type
 */
export enum ChangeEventType {
  Create = "CREATE",
  Move = "MOVE",
  Delete = "DELETE",
  Modify = "MODIFY",
}

/**
 * Fired when a file is moved
 */
export interface MoveEvent {
  eventType: ChangeEventType.Move;
  node: FsNode;
  to: string;
}

/**
 * Fired when a file is deleted
 */
export interface DeleteEvent {
  eventType: ChangeEventType.Delete;
  node: FsNode;
}

/**
 * Fires when a non-text file is changed
 */
export type WatchFileOnChangeListener<T extends string | Blob = string> = (
  newContent: T
) => void;

/**
 * Fires when watching a non-text file fails
 */
export type WatchFileOnErrorListener = (error: string) => void;

/**
 * Fires when a non-text file is moved or deleted
 */
export type WatchFileOnMoveOrDeleteListener = (
  moveOrDeleteEvent: MoveEvent | DeleteEvent
) => void;

/**
 * A set of listeners for watching a non-text file
 */
export interface WatchFileListeners<T extends string | Blob = string> {
  onChange: WatchFileOnChangeListener<T>;
  onError?: WatchFileOnErrorListener;
  onMoveOrDelete?: WatchFileOnMoveOrDeleteListener;
}

/**
 * A written text change for the WriteChange function exposed by WatchTextFileListeners.onReady
 */
export interface TextChange {
  from: number;
  to?: number;
  insert?: string;
}

/**
 * Writes a change to a watched file using the TextChange interface
 */
export type WriteChange = (changes: TextChange | Array<TextChange>) => void;

/**
 * Returns the latest content of a watched file as a string
 */
export type GetLatestContent = () => string;

/**
 * A set of listeners and values exposed by WatchTextFileListeners.onReady
 */
export interface TextFileReadyEvent {
  writeChange: WriteChange;
  getLatestContent: GetLatestContent;
  initialContent: string;
}

/**
 * Signifies a change when a text file's text content is updated
 */
export interface TextFileOnChangeEvent {
  changes: Array<TextChange>;
  latestContent: string;
}

/**
 * Fires when a text file watcher is ready
 */
export type WatchTextFileOnReadyListener = (
  readyEvent: TextFileReadyEvent
) => void;

/**
 * Fires when a watched text file's text content is updated
 */
export type WatchTextFileOnChangeListener = (
  changeEvent: TextFileOnChangeEvent
) => void;

/**
 * Fires when watching a text file fails
 */
export type WatchTextFileOnErrorListener = (error: string) => void;

/**
 * Fires when a watched text file is moved or deleted
 */
export type WatchTextFileOnMoveOrDeleteListener = (
  moveOrDeleteEvent: MoveEvent | DeleteEvent
) => void;

/**
 * A set of listeners for watching a text file
 */
export interface WatchTextFileListeners {
  onReady: WatchTextFileOnReadyListener;
  onChange?: WatchTextFileOnChangeListener;
  onError?: WatchTextFileOnErrorListener;
  onMoveOrDelete?: WatchTextFileOnMoveOrDeleteListener;
}

/**
 * Fires when watching a directory fails
 */
export type WatchDirOnErrorListener = (
  err: Error,
  extraInfo?: Record<string, any>
) => void;

/**
 * Fires when a directory's child nodes change
 */
export type WatchDirOnChangeListener = (children: Array<FsNode>) => void;

/**
 * Fires when a watched directory is moved or deleted
 */
export type WatchDirOnMoveOrDeleteListener = (
  event: DeleteEvent | MoveEvent
) => void;

/**
 * A set of listeners for watching a directory
 */
export interface WatchDirListeners {
  onChange: WatchDirOnChangeListener;
  onMoveOrDelete?: WatchDirOnMoveOrDeleteListener;
  onError: WatchDirOnErrorListener;
}
