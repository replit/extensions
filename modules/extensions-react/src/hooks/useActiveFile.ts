import { useEffect, useState } from "react";
import { session } from "@replit/extensions";
import { useReplit } from "./useReplit";

/**
 * Returns the path to the current file the user is focusing, if it exists in the filesystem.
 */
export default function useActiveFile() {
  const [file, setFile] = useState<string | null>(null);

  const { status } = useReplit();

  useEffect(() => {
    if (status === "ready") {
      (async () => {
        setFile(await session.getActiveFile());
      })();

      return session.onActiveFileChange(async (f: string | null) => setFile(f));
    } else {
      return () => {};
    }
  }, [status]);

  return file;
}
