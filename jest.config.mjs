/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  coveragePathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/dist/", "<rootDir>/node_modules/"],
  globalSetup: "<rootDir>/jest.setup.mjs",
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
};

export default config;
