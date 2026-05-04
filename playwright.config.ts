import { defineConfig } from '@playwright/test'

/**
 * Playwright config for the responsive test suite (§10A).
 * Spins up a local preview server and runs tests against it.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: 'desktop',     use: { viewport: { width: 1280, height: 800 } } },
    { name: 'tablet',      use: { viewport: { width: 768,  height: 1024 } } },
    { name: 'phone-large', use: { viewport: { width: 430,  height: 932 } } },
    { name: 'phone-small', use: { viewport: { width: 375,  height: 812 } } },
  ],
})
