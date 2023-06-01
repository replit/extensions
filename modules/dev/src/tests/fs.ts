import { TestNamespace, TestObject } from "../types";
import { fs, FsNodeType } from "@replit/extensions";
import { assert, expect } from "chai";
import { createTestFile } from "../utils/tests";

const tests: TestObject = {
  readFile: async (log) => {
    // Creates a file and makes sure it exists
    // readFile is already used in the function
    const { fileName, dispose } = await createTestFile("extension_tester/readFile.txt");
    
    // Make sure it returned a string
    assert.isString(fileName);
    log(`Successfully created ${fileName}`)
    
    // Cleanup
    dispose();
  },
  writeFile: async (log) => {
    // Creates a file (writeFile) and makes sure it exists
    const { fileName, fileContent, dispose } = await createTestFile("extension_tester/writeFile.txt");

    log(`Successfully created ${fileName}`);

    assert.isString(fileName);
    assert.isString(fileContent);
    
    dispose();
  },
  readDir: async (log) => {
    const { fileName } = await createTestFile("extension_tester/readDir.txt");
    
    const res = await fs.readDir("extension_tester");

    assert.isArray(res.children);
    expect(res.children).to.deep.include({
      filename: fileName.replace("extension_tester/", ""),
      type: FsNodeType.File
    });
    
  }
};

const FsTests: TestNamespace = {
  module: "fs",
  tests,
};

export default FsTests;
