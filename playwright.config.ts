import fs from 'fs';

import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Use .env.playwright.local in local development if it exists
const envFilePath = '.env.playwright.local';
if (!process.env.CI && fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
}

// Determine used web server type (i.e. development or production)
const webServerType = process.env.PLAYWRIGHT_WEB_SERVER ?? '';

if (!['', 'development', 'production'].includes(webServerType)) {
  throw new Error(
    `Invalid PLAYWRIGHT_WEB_SERVER: ${webServerType}.` +
      'Default is production. Only other option is development.'
  );
}
const useDevServer = webServerType == 'development';

// See https://playwright.dev/docs/test-configuration.
export default defineConfig({
  // https://playwright.dev/docs/api/class-testconfig#test-config-output-dir
  // The output directory for files created during test execution.
  outputDir: './report/test-results',

  // https://playwright.dev/docs/api/class-testconfig#test-config-test-dir
  // Directory that will be recursively scanned for test files.
  testDir: './src/playwright/tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 3 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: [
    // For CI pipeline:
    ['junit', { outputFile: 'report/playwright-junit-results.xml' }],
    // For local development:
    [
      'html',
      {
        open: process.env.CI ? 'never' : 'on-failure',
        outputFolder: 'report/html',
      },
    ],
  ],

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: process.env.VITE_APP_ORIGIN,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'on-first-retry',

    // Use Finnish locale and timezone by default.
    locale: 'fi-FI',
    timezoneId: 'Europe/Helsinki',

    // Use no cookies by defaults.
    storageState: { cookies: [], origins: [] },

    screenshot: {
      fullPage: true,
      mode: 'only-on-failure',
    },

    // https://playwright.dev/docs/videos
    video: 'on-first-retry',
  },

  // Test with the following browsers:
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: useDevServer ? 'yarn dev' : 'yarn serve',
    url: process.env.VITE_APP_ORIGIN,
    reuseExistingServer: true,
  },
});
