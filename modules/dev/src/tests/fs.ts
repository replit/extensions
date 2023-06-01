import { TestNamespace, TestObject } from "../types";
import { fs, FsNodeType } from "@replit/extensions";
import { assert, expect } from "chai";
import {
  assertDirExists,
  createTestDir,
  createTestDirIfNotExists,
  createTestFile,
} from "../utils/tests";
import { randomString } from "../utils/assertions";

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
  watchDir: async (log) => {
    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/watchDir"
    );

    const disposeWatcher = await fs.watchDir(dirName, {
      onChange: (children) => {
        log(
          "Children Updated: " +
            children.map((child) => child.path.split("/").at(-1)).join(", ")
        );
      },
      onError: () => {
        throw new Error("Failed to watch directory");
      },
      onMoveOrDelete: () => {
        log("Directory moved or deleted");
        throw new Error("Directory moved or deleted");
      },
    });

    for (let i = 0; i < 5; i++) {
      const { dispose } = await createTestFile(
        "extension_tester/watchDir/file.txt"
      );

      setTimeout(dispose, 2000);
    }

    disposeWatcher();
    removeDir();
  },
  watchTextFile: async (log) => {
    const { fileName, dispose: disposeFile } = await createTestFile(
      "extension_tester/watchTextFile.txt",
      "Hello World"
    );

    const writeChanges = async () => {
      for (let _ of new Array(5)) {
        await fs.writeFile(fileName, randomString());
      }

      disposeWatcher();
      disposeFile();
    };

    const disposeWatcher = fs.watchTextFile(fileName, {
      onChange: (change) => {
        log(`Watched file updated with ${change.changes.length} OTs.`);
      },
      onError: () => {
        throw new Error("Failed to watch file");
      },
      onMoveOrDelete: () => {
        log("File moved or deleted");
        throw new Error("File moved or deleted");
      },
      onReady: ({ initialContent }) => {
        log(`File Watcher ready with initial content "${initialContent}"`);

        writeChanges();
      },
    });
  },
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
