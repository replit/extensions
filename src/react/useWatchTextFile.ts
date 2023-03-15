import React from "react";
import { HandshakeStatus } from "src/types";
import useReplit from "./useReplit";

interface UseWatchTextFileLoading {
  content: null;
  watching: false;
  watchError: null;
}

interface UseWatchTextFileWatching {
  content: string;
  watching: true;
  watchError: null;
}

interface UseWatchTextFileError {
  content: null;
  watching: false;
  watchError: Error;
}

export default function useWatchTextFile({
  filePath,
}: {
  filePath: string | null | undefined;
}) {
  const [content, setContent] = React.useState(null);
  const [watching, setWatching] = React.useState(false);
  const [watchError, setWatchError] = React.useState(null);

  const { status, replit } = useReplit();

  const connected = status === HandshakeStatus.Ready;

  React.useEffect(() => {
    if (!connected || !filePath) {
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
      if (!connected || !filePath) {
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
  }, [connected, filePath]);

  return React.useMemo(() => {
    const result = {
      content,
      watching,
      watchError,
    };
    if (watching) {
      return result as UseWatchTextFileWatching;
    } else if (watchError) {
      return result as UseWatchTextFileError;
    } else {
      return result as UseWatchTextFileLoading;
    }
  }, [content, watching, watchError]);
}
