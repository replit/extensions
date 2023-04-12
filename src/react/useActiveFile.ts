import { useEffect, useState } from "react";
import { session } from "src/api";
import { useReplit } from "./useReplit";

/**
 * A React hook that returns the current file the user is focusing, if it exists in the filesystem.
 */
export default function useActiveFile() {
  const [file, setFile] = useState<string | null>(null);

  const { status } = useReplit();

  useEffect(() => {
    if (status === "ready") {
      (async () => {
        setFile(await session.getActiveFile());
      })();

      return session.onActiveFileChange(async (f) => setFile(f));
    } else {
      return () => {};
    }
  }, [status]);

  return file;
}
