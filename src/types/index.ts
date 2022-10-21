export type ExtensionPortAPI = {
  fs: {
    readFile: (path: string) => Promise<string>;
    writeFile: (path: string, content: string|Blob) => Promise<{}|{error: string}>;
  }
}