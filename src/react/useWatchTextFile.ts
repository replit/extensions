import React from "react";
import { HandshakeStatus, TextChange } from "src/types";
import useReplit from "./useReplit";



interface UseWatchTextFileLoading {
  content: null;
  watching: false;
  watchError: null;
  writeChange: (changes: TextChange | Array<TextChange>) => Promise<never>;
}

interface UseWatchTextFileWatching {
  content: string;
  watching: true;
  watchError: null;
  writeChange: (changes: TextChange | Array<TextChange>) => Promise<void>;
}

interface UseWatchTextFileError {
  content: null;
  watching: false;
  watchError: Error;
  writeChange: (changes: TextChange | Array<TextChange>) => Promise<never>;
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

  const writeChange = React.useRef<
    (changes: TextChange | Array<TextChange>) => Promise<void | never>
  >(async (_: TextChange | Array<TextChange>) => {
    throw new Error("writeChange is called before onReady");
  });

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
      writeChange.current = async (_: TextChange | Array<TextChange>) => {
        throw new Error("writeChange is called before onReady");
      };
    };

    (async () => {
      if (!replit || !filePath) {
        return;
      }

      try {
        watchFileDispose = await replit.fs.watchTextFile(filePath, {
          onReady: async (event) => {
            setContent(await event.initialContent);
            writeChange.current = async (writeChangeArgs: TextChange | Array<TextChange>) => {
              await event.writeChange(writeChangeArgs);
            };
            setWatching(true);
          },
          onError(err) {
            setWatchError(new Error(err));
            setWatching(false);
            dispose();
          },
          onChange: (changes) => {
            setContent(changes.latestContent);
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
      writeChange: async (changes: TextChange | Array<TextChange>) =>
        await writeChange.current(changes),
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
