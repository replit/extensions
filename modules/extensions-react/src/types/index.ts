import { HandshakeStatus, WriteChange } from "@replit/extensions";
import type * as replit from "@replit/extensions";

export interface UseReplitReady {
  status: HandshakeStatus.Ready;
  error: null;
  filePath: string;
  replit: typeof replit;
}

export interface UseReplitLoading {
  status: HandshakeStatus.Loading;
  error: null;
  filePath: null;
  replit: null;
}

export interface UseReplitFailure {
  status: HandshakeStatus.Error;
  error: Error;
  filePath: null;
  replit: null;
}

export enum UseWatchTextFileStatus {
  Error = "error",
  Loading = "loading",
  Watching = "watching",
  Moved = "moved",
  Deleted = "deleted",
}

export interface UseWatchTextFileLoading {
  status: UseWatchTextFileStatus.Loading;
  content: null;
  watchError: null;
  writeChange: null;
}

export interface UseWatchTextFileWatching {
  status: UseWatchTextFileStatus.Watching;
  content: string;
  watchError: null;
  writeChange: WriteChange;
}

export interface UseWatchTextFileErrorLike {
  status:
    | UseWatchTextFileStatus.Error
    | UseWatchTextFileStatus.Moved
    | UseWatchTextFileStatus.Deleted;
  content: null;
  watchError: string | null;
  writeChange: null;
}
