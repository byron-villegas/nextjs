This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## End To End Tests

### Instalation

#### Playwright
Use this commands

```shell
npm install --save-dev playwright @playwright/test
npx playwright install
```

### Config Scripts
Add this to **package.json** in scripts section

```json
{
  "scripts": {
    // ...existing code...
    "test:e2e": "playwright test"
  }
}
```

### Configuration File
Create the configuration file **playwright.config.ts** with this content

```typescript
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
```

For default generate three reports: list, html and junit. The html and junit report be in **playwright-report** folder

### Create Tests
Create **/e2e/tests** folder and inside the file **homepage.spec.ts** with this content

```typescript
import { test, expect } from '@playwright/test';

test('homepage has NextJS title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NextJS/i);
});
```

### Run Tests
Use this command to run the tests

```shell
npm run test:e2e
```


## Referential Links

https://medium.com/@mertenercan/nextjs-13-folder-structure-c3453d780366