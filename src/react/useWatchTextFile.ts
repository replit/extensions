import React from "react";
import { HandshakeStatus } from "src/types";
import useReplit from "./useReplit";

interface UseWatchTextFileLoading {
  content: null;
  watching: false;
  watchError: null;
  setContent: () => void;
}

interface UseWatchTextFileWatching {
  content: string;
  watching: true;
  watchError: null;
  setContent: (text: string) => Promise<void>;
}

interface UseWatchTextFileError {
  content: null;
  watching: false;
  watchError: Error;
  setContent: () => void;
}

export default function useWatchTextFile({
  filePath,
}: {
  filePath: string | null | undefined;
}) {
  const [content, setContent] = React.useState<string | null>(null);
  const [watching, setWatching] = React.useState(false);
  const [watchError, setWatchError] = React.useState<Error | null>(null);

  const { status, replit } = useReplit();

  const connected = status === HandshakeStatus.Ready;

  const setContentRef = React.useRef(() => {});

  React.useEffect(() => {
    if (!connected || !filePath) {
      return;
    }

    let watchFileDispose: null | (() => void) = null;
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
      if (!replit || !filePath) {
        return;
      }

      try {
        watchFileDispose = await replit.fs.watchTextFile(filePath, {
          onReady: async (args) => {
            setContent(await args.initialContent);
            setContentRef.current = async (text) => {
              await args.writeFile({
                from: 0,
                to: text.length,
                insert: text
              })
            }
            setWatching(true);
          },
          onError(err) {
            setWatchError(new Error(err));
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
        setWatchError(e as Error);
        setWatching(false);
      }
    })();

    return dispose;
  }, [connected, filePath, replit]);

  return React.useMemo(() => {
    const result = {
      content,
      watching,
      watchError,
      setContent: setContentRef.current,
    };
    if (watching) {
      return result as UseWatchTextFileWatching;
    } else if (watchError) {
      return result as UseWatchTextFileError;
    } else {
      return result as UseWatchTextFileLoading;
    }
  }, [content, watching, watchError, setContentRef]);
}
