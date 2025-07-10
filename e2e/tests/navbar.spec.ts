import { test, expect } from '@playwright/test';

test.describe('Navbar Navigation Tests', () => {
    test('Home is active', async ({ page }) => {
        await page.goto('/');

        // Check if the home link is active
        const homeLink = page.locator('xpath=//a[@href="/" and normalize-space(text())="Home"]');

        await expect(homeLink).toHaveClass(/active/);
    });

    test('Users is active', async ({ page }) => {
        await page.goto('/users');

        // Check if the users link is active
        const usersLink = page.locator('xpath=//a[@href="/users" and normalize-space(text())="Users"]');

        await expect(usersLink).toHaveClass(/active/);
    });

    test('About is active', async ({ page }) => {
        await page.goto('/about');

        // Check if the about link is active
        const aboutLink = page.locator('xpath=//a[@href="/about" and normalize-space(text())="About"]');

        await expect(aboutLink).toHaveClass(/active/);
    });
});