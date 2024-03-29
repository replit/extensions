import React from "react";
import { useReplit } from "./useReplit";
import {
  UseWatchTextFileErrorLike,
  UseWatchTextFileLoading,
  UseWatchTextFileWatching,
  UseWatchTextFileStatus,
} from "../types";

/**
 * Returns the watching status and contents of a text file at the given `filePath`.  Also provides a `writeChange` function that enables you to write a change to the watched text file.
 */
export function useWatchTextFile({
  filePath,
}: {
  filePath: string | null | undefined;
}):
  | UseWatchTextFileLoading
  | UseWatchTextFileWatching
  | UseWatchTextFileErrorLike {
  const [state, setState] = React.useState<
    | UseWatchTextFileLoading
    | UseWatchTextFileWatching
    | UseWatchTextFileErrorLike
  >({
    status: UseWatchTextFileStatus.Loading,
    content: null,
    watchError: null,
    writeChange: null,
  });

  const { replit } = useReplit();

  React.useEffect(() => {
    setState((prev) => {
      if (prev.status === UseWatchTextFileStatus.Loading) {
        return prev;
      }

      return {
        status: UseWatchTextFileStatus.Loading,
        content: null,
        watchError: null,
        writeChange: null,
      };
    });

    if (!replit || !filePath) {
      return;
    }

    // keep a local redudant state so that we don't rely on state.status in the effect
    let isWatching = false;

    const dispose = replit.fs.watchTextFile(filePath, {
      onReady: ({ initialContent, writeChange, getLatestContent }) => {
        isWatching = true;
        setState({
          status: UseWatchTextFileStatus.Watching,
          content: initialContent,
          watchError: null,
          writeChange: (changes) => {
            if (!isWatching) {
              return;
            }

            writeChange(changes);
            // We must update the state here because the file watcher
            // doesn't loop back to us to update the state
            setState((prev) => {
              if (prev.status !== UseWatchTextFileStatus.Watching) {
                throw new Error(
                  "wrote change to file that was not being watched"
                );
              }

              return {
                ...prev,
                content: getLatestContent(),
              };
            });
          },
        });
      },
      onChange: (changes) => {
        if (!isWatching) {
          return;
        }

        setState((prev) => {
          if (prev.status !== UseWatchTextFileStatus.Watching) {
            throw new Error("got update on an unwatched file");
          }

          return {
            ...prev,
            content: changes.latestContent,
          };
        });
      },
      onError(err) {
        setState({
          status: UseWatchTextFileStatus.Error,
          content: null,
          watchError: err,
          writeChange: null,
        });
        isWatching = false;
      },
      onMoveOrDelete: ({ eventType }) => {
        setState({
          status:
            eventType === "MOVE"
              ? UseWatchTextFileStatus.Moved
              : UseWatchTextFileStatus.Deleted,
          content: null,
          watchError: null,
          writeChange: null,
        });
        isWatching = false;
      },
    });

    return () => {
      isWatching = false;
      dispose();
    };
  }, [filePath, replit]);

  return state;
}
