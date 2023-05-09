/**
 * Fires when the current user switches to a different file/tool in the workspace.  Returns null if the current file/tool cannot be found in the filesystem.
 */
export type OnActiveFileChangeListener = (file: string | null) => void;
