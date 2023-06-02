export default {
  transform: {
    "^.+\\.(ts|js)x?$": "esbuild-jest",
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};
