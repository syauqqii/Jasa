const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 3000 * 1000,
  expect: {
    timeout: 75000000000000000000
  },
  reporter: 'html',
  use: {
    browserName: 'firefox',
    headless: false
  },

  // name: 'chromium',
  // use: {
  //   ...devices['Desktop Chrome'],
  // }
  // name: 'firefox',
  // use: {
  //   ...devices['Desktop Firefox'],
  // }
  // name: 'webkit',
  // use: {
  //   ...devices['Desktop Safari'],
  // }

};

module.exports = config;