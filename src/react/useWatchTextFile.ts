import React from "react";
import { WriteChange, UseWatchTextFileStatus } from "src/types";
import useReplit from "./useReplit";

interface UseWatchTextFileLoading {
  status: Status.Loading;
  content: null;
  watchError: null;
  writeChange: null;
}

interface UseWatchTextFileWatching {
  status: Status.Watching;
  content: string;
  watchError: null;
  writeChange: WriteChange;
}

interface UseWatchTextFileErrorLike {
  status: Status.Error | Status.Moved | Status.Deleted;
  content: null;
  watchError: string | null;
  writeChange: null;
}

export default function useWatchTextFile({
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
    status: Status.Loading,
    content: null,
    watchError: null,
    writeChange: null,
  });

  const { replit } = useReplit();

  React.useEffect(() => {
    setState((prev) => {
      if (prev.status === Status.Loading) {
        return prev;
      }

      return {
        status: Status.Loading,
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
          status: Status.Watching,
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
              if (prev.status !== Status.Watching) {
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
          if (prev.status !== Status.Watching) {
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
          status: Status.Error,
          content: null,
          watchError: err,
          writeChange: null,
        });
        isWatching = false;
      },
      onMoveOrDelete: ({ eventType }) => {
        setState({
          status: eventType === "MOVE" ? Status.Moved : Status.Deleted,
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
