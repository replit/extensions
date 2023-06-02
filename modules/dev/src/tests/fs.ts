import { TestNamespace, TestObject } from "../types";
import { fs, FsNodeType } from "@replit/extensions";
import { assert, expect } from "chai";
import { assertDirExists, createTestDir, createTestFile } from "../utils/tests";
import { randomString } from "../utils/assertions";

const tests: TestObject = {
  "writeFile should create a new file, readFile should read its contents":
    async () => {
      const { dispose } = await createTestFile("extension_tester/readFile.txt");

      // Cleanup
      dispose();
    },

  "createDir should create a new directory, readDir should list its children":
    async () => {
      const { dirName, dispose: removeDir } = await createTestDir(
        "extension_tester/createDir"
      );
      const { fileName, dispose } = await createTestFile(
        `extension_tester/createDir/createDir.txt`
      );

      // Read the directory to ensure the new directory exists
      const { children } = await assertDirExists(dirName);
      expect(children).to.deep.include({
        filename: fileName.replace("extension_tester/createDir/", ""),
        type: FsNodeType.File,
      });

      // Cleanup
      dispose();
      removeDir();
    },

  "deleteFile should delete a file": async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/deleteFile.txt"
    );

    await fs.deleteFile(fileName);

    // Read the directory to ensure the file doesn't exist
    const res = await fs.readDir("extension_tester");
    expect(res.children).to.not.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    // Cleanup
    dispose();
  },

  "deleteDir should delete a directory": async () => {
    const { dispose } = await createTestDir("extension_tester/deleteDir");

    // Cleanup
    dispose();
  },

  "move should move a file to the specified path": async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/move.txt"
    );
    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/move"
    );

    // Move the file
    const res = await fs.move(
      fileName,
      fileName.replace("extension_tester", dirName)
    );
    assert.isTrue(res.success);

    // Test to see if the file is in the new dir
    const { children } = await assertDirExists(dirName);
    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    // Cleanup
    dispose();
    removeDir();
  },

  "copyFile should copy a file to the specified path": async () => {
    const { fileName, dispose } = await createTestFile(
      "extension_tester/copyFile.txt"
    );
    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/copyFile"
    );

    // Copy the file
    const res = await fs.copyFile(
      fileName,
      fileName.replace("extension_tester", dirName)
    );
    assert.isTrue(res.success);

    // Check to see if the file is in the new dir
    const { children } = await assertDirExists(dirName);
    expect(children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File,
    });

    // Cleanup
    dispose();
    removeDir();
  },

  "watchFile should watch the contents of a file": async (log) => {
    const { fileName, dispose: disposeFile } = await createTestFile(
      "extension_tester/watchFile.txt",
      "Hello World"
    );

    // Initialize the watcher
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

    // Update the file
    for (let i = 0; i < 5; i++) {
      await fs.writeFile(fileName, randomString());
    }

    // Cleanup
    disposeWatcher();
    disposeFile();
  },

  "watchDir should watch the children in a directory": async (log) => {
    const { dirName, dispose: removeDir } = await createTestDir(
      "extension_tester/watchDir"
    );

    // Initialize the watcher
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

    // Create test files
    for (let i = 0; i < 5; i++) {
      const { dispose } = await createTestFile(
        "extension_tester/watchDir/file.txt"
      );

      setTimeout(dispose, 2000);
    }

    // Cleanup
    disposeWatcher();
    removeDir();
  },

  "watchTextFile should watch the contents of a text file": async (log) => {
    const { fileName, dispose: disposeFile } = await createTestFile(
      "extension_tester/watchTextFile.txt",
      "Hello World"
    );

    // Iniitialize the watcher
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

    // Update the watched file + Cleanup
    const writeChanges = async () => {
      for (let _ of new Array(5)) {
        await fs.writeFile(fileName, randomString());
      }

      disposeWatcher();
      disposeFile();
    };
  },
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
