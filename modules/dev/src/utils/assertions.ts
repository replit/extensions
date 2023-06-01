import { assert } from "chai";

// Makes sure a file's contents is a string and that no errors have occured.
export function assertFileContents(
  file:
    | {
        content: string;
      }
    | { error: string }
) {
  if ("content" in file) {
    assert.isString(file.content);

    return file.content;
  } else {
    throw new Error("Expected a string");
  }
}

// Makes sure a path/file name is prefixed with the test directory
export function assertPathOrNameValidity(
  pathOrName: string
): asserts pathOrName is string {
  if (!pathOrName.startsWith("extension_tester")) {
    throw new Error("Test files must be prefixed with extension_tester");
  }
}

// Generate a random string
export const randomString = () => Math.random().toString(36).slice(2);
