import { TestNamespace, TestObject } from "../types";
import { fs, FsNodeType } from "@replit/extensions";
import { assert, expect } from "chai";
import {
  assertDirExists,
  assertFileExists,
  createTestDir,
  createTestDirIfNotExists,
  createTestFile,
} from "../utils/tests";
import { assertFileContents, randomString } from "../utils/assertions";

const tests: TestObject = {
  "writeFile & readFile": async () => {
    // runs fs.writeFile and fs.readFile
    (await createTestFile("extension_tester/readFile.txt")).dispose();
  },
  readDir: async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/readDir.txt"
    );

    const { children } = await assertDirExists("extension_tester");
    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    dispose();
  },
  createDir: async () => {
    await createTestDirIfNotExists();

    // Create test directory
    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/createDir"
    );

    // Add a test file to the directory
    const { fileName, dispose } = await createTestFile(
      `extension_tester/createDir/createDir.txt`
    );

    // Read the directory
    const { children } = await assertDirExists(dirName);

    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/createDir/", ""),
      type: FsNodeType.File,
    });

    // Cleanup
    dispose();
    removeDir();
  },
  deleteFile: async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/deleteFile.txt"
    );

    await fs.deleteFile(fileName);

    const res = await fs.readDir("extension_tester");

    assert.isArray(res.children);
    expect(res.children).to.not.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    dispose();
  },
  deleteDir: async () => {
    await createTestDirIfNotExists();

    const { dispose } = await createTestDir("extension_tester/deleteDir");

    dispose();
  },
  move: async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/move.txt"
    );

    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/move"
    );

    const res = await fs.move(
      fileName,
      fileName.replace("extension_tester", dirName)
    );

    assert.isTrue(res.success);

    const { children } = await assertDirExists(dirName);

    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    dispose();
    removeDir();
  },
  copyFile: async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/copyFile.txt"
    );

    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/copyFile"
    );

    const res = await fs.copyFile(
      fileName,
      fileName.replace("extension_tester", dirName)
    );

    assert.isTrue(res.success);

    const { children } = await assertDirExists(dirName);

    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    dispose();
    removeDir();
  },
  watchFile: async (log) => {
    const { fileName, dispose: disposeFile } = await createTestFile(
      "extension_tester/watchFile.txt",
      "Hello World"
    );

    const disposeWatcher = await fs.watchFile(fileName, {
      onChange: (change) => {
        log("Content updated: " + change);
      },
      onError: () => {
        throw new Error("Failed to watch file");
      },
      onMoveOrDelete: () => {
        log("File moved or deleted");
        throw new Error("File moved or deleted");
      },
    });

    for (let i = 0; i < 10; i++) {
      await fs.writeFile(fileName, randomString());
    }

    disposeWatcher();
    disposeFile();
  },
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
