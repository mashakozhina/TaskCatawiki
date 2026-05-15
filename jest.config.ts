import type { Config } from "jest";
import "dotenv/config";

const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/api-tests/specs/**/*.test.ts"],
  testTimeout: 20000,
  reporters: [
    "default",
    [
      "jest-html-reporters",
      { publicPath: `./jest-report-${timestamp}`, filename: "index.html" },
    ],
  ],
};

export default config;
