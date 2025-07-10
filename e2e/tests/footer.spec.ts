import { test, expect } from '@playwright/test';

test.describe('Footer Navigation Tests', () => {
    test('Home is active', async ({ page }) => {
        await page.goto('/');

        // Check if the home link is active
        const homeLink = page.locator('xpath=(//a[@href="/" and normalize-space(text())="HOME"])[1]');

        await expect(homeLink).toHaveClass(/text-white/);
    });

    test('Users is active', async ({ page }) => {
        await page.goto('/users');

        // Check if the users link is active
        const usersLink = page.locator('xpath=//a[@href="/users" and normalize-space(text())="USERS"]');

        await expect(usersLink).toHaveClass(/text-white/);
    });

    test('About is active', async ({ page }) => {
        await page.goto('/about');

        // Check if the about link is active
        const aboutLink = page.locator('xpath=//a[@href="/about" and normalize-space(text())="ABOUT"]');

        await expect(aboutLink).toHaveClass(/text-white/);
    });
});

test.describe('Footer Year Display Tests', () => {
    test('Current year is displayed correctly', async ({ page }) => {
        await page.goto('/');

        // Get the current year
        const currentYear = new Date().getFullYear();

        // Check if the footer displays the correct year
        const footerYear = page.locator('xpath=//small[contains(text(), "©")]');
        await expect(footerYear).toContainText(`© ${currentYear} - ${currentYear + 1}`);
    });
});

test.describe('Footer Copyright Tests', () => {
    test('Footer copyright text is correct', async ({ page }) => {
        await page.goto('/');

        // Check if the footer contains the correct copyright text
        const footerText = page.locator('xpath=//p[contains(normalize-space(.), "Todos los derechos reservados.")]');
        const currentYear = new Date().getFullYear();
        await expect(footerText).toContainText(`Copyright © ${currentYear}. Todos los derechos reservados.`);
    });
});