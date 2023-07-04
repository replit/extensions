export default {
  projects: [
    {
      displayName: "buildTests",
      transform: {
        "^.+\\.(ts|js)x?$": "esbuild-jest",
      },
      testMatch: ["<rootDir>/buildTests/**.test.ts"],
      testEnvironment: "node",
      setupFilesAfterEnv: ["<rootDir>/jest-setup-jsdom.js"],
    },
    {
      displayName: "tests",
      transform: {
        "^.+\\.(ts|js)x?$": "esbuild-jest",
      },
      testMatch: [
        "<rootDir>/src/**/__tests__/**/*.[jt]s?(x)",
        "<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)",
      ],
      testPathIgnorePatterns: ["buildTests"],
      testEnvironment: "node",
    },
  ],
};
