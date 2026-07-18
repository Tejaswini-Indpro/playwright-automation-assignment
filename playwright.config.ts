import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: 60 * 1000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: false,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {

    storageState: 'auth/storageState.json',
    baseURL: process.env.AA_URL,

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'retain-on-failure',

    viewport: {
      width: 1920,
      height: 1080
    },

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});