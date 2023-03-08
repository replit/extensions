import { useState } from "react";
import { WatchTextFileWatchers } from "src/types";
import useReplitCallback from "./useReplitCallback";

interface Snapshot {
  content: string;
  version: number;
}

interface LatestSnapshot extends Snapshot {
  changeSource: string;
  changes: any; // TODO fix
}

export default function useTextFileWatcher(
  filename: string,
  watchers?: WatchTextFileWatchers
) {
  const [initial, setInitial] = useState<Snapshot | null>(null);
  const [latest, setLatest] = useState<LatestSnapshot>(null);
  const [error, setError] = useState<string | null>(null);

  useReplitCallback(async ({ fs }) => {
    await fs.watchTextFile(filename, {
      onReady(data) {
        setInitial({
          content: data.initialContent,
          version: data.version,
        });
        watchers?.onReady?.(data);
      },
      onChange(data) {
        setLatest({
          content: data.latestContent,
          version: data.version,
          changeSource: data.changeSource,
          changes: data.changes,
        });
        watchers?.onChange?.(data);
      },
      onError(error) {
        setError(error);
        watchers?.onError?.(error);
      },
      onMoveOrDelete(data) {
        watchers?.onMoveOrDelete?.(data);
      },
    });
  }, [filename]);

  return { initial, latest, error };
}
