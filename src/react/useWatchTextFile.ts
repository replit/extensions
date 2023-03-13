import React from "react";
import * as replit from "../index";
import useReplit from "./useReplit";

interface UseWatchTextFileLoading {
  content: null;
  watching: false;
  watchError: null;
}

interface UseWatchTextFileError {
  content: null;
  watching: false;
  watchError: Error;
}

interface UseWatchTextFileWatching {
  content: string;
  watching: true;
  watchError: null;
}

/**
 * Returns the contents of a text file in realtime
 */
export default function useWatchTextFile({
  filePath,
}: {
  filePath: string | null | undefined;
}) {
  const [content, setContent] = React.useState<string | null>(null);
  const [watching, setWatching] = React.useState<boolean>(false);
  const [watchError, setWatchError] = React.useState<Error | null>(null);

  const { status } = useReplit();

  React.useEffect(() => {
    if (status !== "ready" || !filePath) {
      return;
    }

    let watchFileDispose;
    let dispose = () => {
      if (watchFileDispose) {
        watchFileDispose();
        watchFileDispose = null;
      }
      setWatching(false);
      setContent(null);
      setWatchError(null);
    };

    (async () => {
      if (status !== "ready" || !filePath) {
        return;
      }

      try {
        watchFileDispose = await replit.fs.watchTextFile(filePath, {
          onReady: async (args) => {
            setContent(await args.initialContent);
            setWatching(true);
          },
          onError(err) {
            setWatchError(err);
            setWatching(false);
            dispose();
          },
          onChange: (args) => {
            setContent(args.latestContent);
          },
          onMoveOrDelete: () => {
            setWatching(false);
          },
        });
      } catch (e) {
        setWatchError(e);
        setWatching(false);
      }
    })();

    return dispose;
  }, [status, filePath]);

  return React.useMemo(
    () => {
      const output = {
        content,
        watching,
        watchError,
      };

      if(watching) {
        return output as UseWatchTextFileWatching;
      } else {
        if(watchError) {
          return output as UseWatchTextFileError;
        } else {
          return output as UseWatchTextFileLoading;
        }
      }
    },
    [content, watching, watchError]
  );
}
