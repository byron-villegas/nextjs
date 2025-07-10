import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  timeout: 10000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on', // 'on' para todos los tests, 'retain-on-failure' para capturar solo si falla
    video: 'on', // 'on' para grabar video de todos los tests, 'retain-on-failure' para grabar solo si falla
  },
  reporter: [ // Reportes
    ['list'],
    ['html'],
    ['junit', { outputFile: './playwright-report/junit-report.xml' }],
  ],
  projects: [ // Navegadores
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});