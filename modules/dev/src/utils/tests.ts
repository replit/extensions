import {
  assertPathOrNameValidity,
  assertFileContents,
  randomString,
} from "./assertions";
import { fs } from "@replit/extensions";
import { assert } from "chai";

// Create the test directory if it doesn't exist
export async function createTestDirIfNotExists() {
  const res = await fs.readDir("extension_tester");

  if (!Array.isArray(res.children) || res.error) {
    await fs.createDir("extension_tester");
  }
}

// Create a test file suffixed with a timestamp
export async function createTestFile(name: string, content?: string) {
  assertPathOrNameValidity(name);

  // Need the test dir
  await createTestDirIfNotExists();

  // Append a timestamp to the file name
  const fileName = name.replace(".", `-${Date.now()}.`);
  const fileContent = content || randomString();

  // Create the file
  await fs.writeFile(fileName, fileContent);

  // Assert that the file has been created and exists
  await assertFileExists(fileName);

  // Cleanup
  const dispose = async () => {
    await fs.deleteFile(fileName);
  };

  return { fileName, fileContent, dispose };
}

// Makes sure a file exists
export async function assertFileExists(path: string) {
  assertPathOrNameValidity(path);
  const res = await fs.readFile(path);
  assertFileContents(res);

  return {
    content: assertFileContents(res),
  };
}

// Make sure a directory exists
export async function assertDirExists(path: string) {
  assertPathOrNameValidity(path);
  const res = await fs.readDir(path);
  assert.isArray(res.children);

  return {
    children: res.children,
  };
}

// Create a test directory by name
export async function createTestDir(dirName: string) {
  assertPathOrNameValidity(dirName);

  await createTestDirIfNotExists();

  await fs.createDir(dirName);

  // Assert that the directory has been created and exists
  await assertDirExists(dirName);

  const dispose = async () => {
    await fs.deleteDir(dirName);
  };

  return { dirName, dispose };
}
