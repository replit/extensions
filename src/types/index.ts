export type ExtensionPortAPI = {
    readFile: (path: string) => Promise<string>;
}