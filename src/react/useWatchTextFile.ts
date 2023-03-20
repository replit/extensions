import React from "react";
import { HandshakeStatus } from "src/types";
import useReplit from "./useReplit";

interface UseWatchTextFileLoading {
  content: null;
  watching: false;
  watchError: null;
  writeChange: (args: WriteChangeArgs) => void;
  replaceContent: (text: string) => void;
}

interface UseWatchTextFileWatching {
  content: string;
  watching: true;
  watchError: null;
  writeChange: (args: WriteChangeArgs) => Promise<void>;
  replaceContent: (text: string) => Promise<void>;
}

interface UseWatchTextFileError {
  content: null;
  watching: false;
  watchError: Error;
  writeChange: (args: WriteChangeArgs) => void;
  replaceContent: (text: string) => void;
}

export interface WriteChangeArgs {
  from: number;
  to: number;
  insert: string;
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

  const writeChange = React.useRef(() => {});

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
            writeChange.current = async (writeChangeArgs: WriteChangeArgs) => {
              await args.writeChange(writeChangeArgs);
            };
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
      writeChange: watching
        ? (args: WriteChangeArgs) => writeChange.current(args)
        : (_: WriteChangeArgs) => {},
      replaceContent: watching
        ? async (text: string) =>
            await writeChange.current({
              from: 0,
              to: text.length,
              insert: text,
            })
        : (_: string) => {},
    };
    if (watching) {
      return result as UseWatchTextFileWatching;
    } else if (watchError) {
      return result as UseWatchTextFileError;
    } else {
      return result as UseWatchTextFileLoading;
    }
  }, [content, watching, watchError, writeChange]);
}
