const { resolve } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const JSON5 = require('json5');
const CI = !!process.env.CI;
const { readFileSync } = require('fs');
const { platform } = require('os');

const ROOT_DIR = __dirname;
const TSCONFIG = resolve(ROOT_DIR, 'tsconfig.json');
const tsconfigStr = readFileSync(TSCONFIG, 'utf8');
const tsconfig = JSON5.parse(tsconfigStr);

process.env.LC_ALL = 'en_US';

let testMatch = ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'];

if (process.env.LEAK_TEST) {
  testMatch.push('!**/examples/grpc-*/**');
  testMatch.push('!**/examples/sqlite-*/**');
  testMatch.push('!**/examples/mysql-*/**');
  testMatch.push('!**/examples/v1-next/grpc-*/**');
  testMatch.push('!**/examples/v1-next/sqlite-*/**');
  testMatch.push('!**/examples/v1-next/mysql-*/**');
  testMatch.push('!**/examples/federation-example/tests/polling.test.ts');
}

testMatch.push(process.env.INTEGRATION_TEST ? '!**/packages/**' : '!**/examples/**');

testMatch.push(
  process.env.INTEGRATION_TEST
    ? '**/packages/**/__integration_tests__/**'
    : '!**/packages/**/__integration_tests__/**',
);

testMatch.push(
  process.env.INTEGRATION_TEST && !process.env.LEAK_TEST
    ? '**/packages/plugins/newrelic/tests/**'
    : '!**/packages/plugins/newrelic/tests/**',
);

if (process.env.E2E_TEST) {
  testMatch = ['**/e2e/**/?(*.)+(spec|test).[jt]s?(x)'];
} else {
  testMatch.push('!**/e2e/**/?(*.)+(spec|test).[jt]s?(x)');
}

const platformName = platform();
const isLinux = platformName === 'linux';
const isWindows = platformName === 'win32';

if (process.env.E2E_TEST && process.env.CI && !isLinux) {
  // TODO: containers are not starting on non-linux environments
  testMatch.push('!**/e2e/auto-type-merging/**');
  testMatch.push('!**/e2e/neo4j-example/**');
  testMatch.push('!**/e2e/soap-demo/**');
  testMatch.push('!**/e2e/mysql-employees/**');
  testMatch.push('!**/e2e/opentelemetry/**');
  if (isWindows) {
    testMatch.push('!**/e2e/tsconfig-paths/**');
    testMatch.push('!**/e2e/cjs-project/**');
  }
}

// Disable grpc-reflection tests for Node.js v22.7.0
// See https://github.com/nodejs/node/issues/54518
if (process.version === 'v22.7.0') {
  testMatch.push('!**/examples/grpc-reflection*/**');
}

/** @type {import('jest').Config} */
module.exports = {
  ...(process.env.E2E_SERVE_RUNNER === 'docker'
    ? {
        maxWorkers: 5, // TODO: running with more than 5 workers breaks docker
      }
    : {}),
  prettierPath: null, // not supported before Jest v30 https://github.com/jestjs/jest/issues/14305
  testEnvironment: 'node',
  rootDir: ROOT_DIR,
  restoreMocks: true,
  reporters: ['default'],
  verbose: !!process.env.CI,
  modulePathIgnorePatterns: ['dist', 'fixtures', '.bob'],
  moduleNameMapper: {
    '@graphql-mesh/cross-helpers': '<rootDir>/packages/cross-helpers/node.js',
    // Packages outside this repo
    '@graphql-mesh/fusion-runtime':
      '<rootDir>/node_modules/@graphql-mesh/fusion-runtime/cjs/index.js',
    '@graphql-mesh/transport-common':
      '<rootDir>/node_modules/@graphql-mesh/transport-common/cjs/index.js',
    '@graphql-mesh/transport-http':
      '<rootDir>/node_modules/@graphql-mesh/transport-http/cjs/index.js',
    '@graphql-mesh/transport-ws': '<rootDir>/node_modules/@graphql-mesh/transport-ws/cjs/index.js',
    '@graphql-mesh/transport-http-callback':
      '<rootDir>/node_modules/transport-http-callback/cjs/index.js',

    '^graphql$': '<rootDir>/node_modules/graphql/index.js',
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: `${ROOT_DIR}/`,
      useESM: true,
    }),
  },
  collectCoverage: false,
  cacheDirectory: resolve(ROOT_DIR, `${CI ? '' : 'node_modules/'}.cache/jest`),
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.m?(t|j)s?$': 'babel-jest',
  },
  resolver: 'bob-the-bundler/jest-resolver',
  testMatch,
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
};
