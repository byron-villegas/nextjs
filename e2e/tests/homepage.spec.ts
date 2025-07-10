import { test, expect } from '@playwright/test';

test('homepage has NextJS title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/NextJS/i);
});