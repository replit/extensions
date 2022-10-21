export type ExtensionPortAPI = {
  readFile: (path: string) => Promise<{ content: string } | { error: string }>;
  writeFile: (
    path: string,
    content: string | Blob
  ) => Promise<{ success: boolean } | { error: string }>;
  readDir: (path: string) => Promise<{
    children: Array<{ filename: string; type: "FILE" | "DIRECTORY" }>;
    error: string;
  }>;
  createDir: (path: string) => Promise<{} | { error: string }>;
};
