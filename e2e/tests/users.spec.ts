import { test, expect } from '@playwright/test';

function calculateAge(value: string): number {
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 0 || isNaN(age)) {
        age = 0; // Default to 0 if the date is invalid or in the future
    }

    return age;
}

test.describe('Users Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/users');
    });

    test('Users details title is visible', async ({ page }) => {
        const userDetailsTitle = page.locator('xpath=//h1[contains(text(), "User Details")]');
        await expect(userDetailsTitle).toBeVisible();
    });

    test('Users add title is visible', async ({ page }) => {
        const usersAddTitle = page.locator('xpath=//h3[contains(text(), "Add User")]');
        await expect(usersAddTitle).toBeVisible();
    });

    test('Users list title is visible', async ({ page }) => {
        const usersListTitle = page.locator('xpath=//h3[contains(text(), "Users")]');
        await expect(usersListTitle).toBeVisible();
    });

    test('User add input fields are visible', async ({ page }) => {
        const userRutInput = page.locator('xpath=//input[@id="rut"]');
        const userNombresInput = page.locator('xpath=//input[@id="nombres"]');
        const userApellidosInput = page.locator('xpath=//input[@id="apellidos"]');
        const userFechaNacimientoInput = page.locator('xpath=//input[@id="fechaNacimiento"]');
        const userEdadInput = page.locator('xpath=//input[@id="edad"]');
        const userSexoMasculinoInput = page.locator('xpath=//input[@id="sexoM"]');
        const userSexoFemeninoInput = page.locator('xpath=//input[@id="sexoF"]');
        const userSaldoInput = page.locator('xpath=//input[@id="saldo"]');

        await expect(userRutInput).toBeVisible();
        await expect(userNombresInput).toBeVisible();
        await expect(userApellidosInput).toBeVisible();
        await expect(userFechaNacimientoInput).toBeVisible();
        await expect(userEdadInput).toBeVisible();
        await expect(userSexoMasculinoInput).toBeVisible();
        await expect(userSexoFemeninoInput).toBeVisible();
        await expect(userSaldoInput).toBeVisible();
    });

    test('User add input fields are invalid', async ({ page }) => {
        const userRutInput = page.locator('xpath=//input[@id="rut"]');
        const userNombresInput = page.locator('xpath=//input[@id="nombres"]');
        const userApellidosInput = page.locator('xpath=//input[@id="apellidos"]');
        const userFechaNacimientoInput = page.locator('xpath=//input[@id="fechaNacimiento"]');
        const userEdadInput = page.locator('xpath=//input[@id="edad"]');
        const userSaldoInput = page.locator('xpath=//input[@id="saldo"]');

        await expect(userRutInput).toHaveClass(/is-invalid/);
        await expect(userNombresInput).toHaveClass(/is-invalid/);
        await expect(userApellidosInput).toHaveClass(/is-invalid/);
        await expect(userFechaNacimientoInput).toHaveClass(/is-invalid/);
        await expect(userEdadInput).toHaveClass(/is-invalid/);
        await expect(userSaldoInput).toHaveClass(/is-invalid/);
    });

    test('Users add input fields error messages are visible', async ({ page }) => {
        const userRutInputErrors = page.locator('xpath=//span[@id="rut-errors"]');
        const userNombresInputErrors = page.locator('xpath=//span[@id="nombres-errors"]');
        const userApellidosInputErrors = page.locator('xpath=//span[@id="apellidos-errors"]');
        const userFechaNacimientoInputErrors = page.locator('xpath=//span[@id="fechaNacimiento-errors"]');
        const userEdadInputErrors = page.locator('xpath=//span[@id="edad-errors"]');
        const userSexoInputErrors = page.locator('xpath=//span[@id="sexo-errors"]');
        const userSaldoInputErrors = page.locator('xpath=//span[@id="saldo-errors"]');

        await expect(userRutInputErrors.locator('xpath=./*')).toHaveCount(3);
        await expect(userNombresInputErrors.locator('xpath=./*')).toHaveCount(2);
        await expect(userApellidosInputErrors.locator('xpath=./*')).toHaveCount(2);
        await expect(userFechaNacimientoInputErrors.locator('xpath=./*')).toHaveCount(3);
        await expect(userEdadInputErrors.locator('xpath=./*')).toHaveCount(1);
        await expect(userSexoInputErrors.locator('xpath=./*')).toHaveCount(2);
        await expect(userSaldoInputErrors.locator('xpath=./*')).toHaveCount(1);
    });

    test('Users add input fields are valid', async ({ page }) => {
        const userRutInput = page.locator('xpath=//input[@id="rut"]');
        const userNombresInput = page.locator('xpath=//input[@id="nombres"]');
        const userApellidosInput = page.locator('xpath=//input[@id="apellidos"]');
        const userFechaNacimientoInput = page.locator('xpath=//input[@id="fechaNacimiento"]');
        const userEdadInput = page.locator('xpath=//input[@id="edad"]');
        const userSexoMasculinoInput = page.locator('xpath=//input[@id="sexoM"]');
        const userSaldoInput = page.locator('xpath=//input[@id="saldo"]');

        const birthDate = '1996-06-22';
        const age = calculateAge(birthDate).toString();

        await userRutInput.fill('111111111');
        await userNombresInput.fill('Juan Carlos');
        await userApellidosInput.fill('Bodoque Triviño');
        await userFechaNacimientoInput.fill(birthDate);
        await userSexoMasculinoInput.check();
        await userSaldoInput.fill('100000');

        await expect(userRutInput).not.toHaveClass(/is-invalid/);
        await expect(userNombresInput).not.toHaveClass(/is-invalid/);
        await expect(userApellidosInput).not.toHaveClass(/is-invalid/);
        await expect(userFechaNacimientoInput).not.toHaveClass(/is-invalid/);
        await expect(userEdadInput).not.toHaveClass(/is-invalid/);
        await expect(userSaldoInput).not.toHaveClass(/is-invalid/);

        await expect(userRutInput).toHaveValue('11.111.111-1');
        await expect(userNombresInput).toHaveValue('Juan Carlos');
        await expect(userApellidosInput).toHaveValue('Bodoque Triviño');
        await expect(userFechaNacimientoInput).toHaveValue(birthDate);
        await expect(userEdadInput).toHaveValue(age);
        await expect(userSexoMasculinoInput).toBeChecked();
        await expect(userSaldoInput).toHaveValue('100000');
    });

        test('Users add create user', async ({ page }) => {
        const userRutInput = page.locator('xpath=//input[@id="rut"]');
        const userNombresInput = page.locator('xpath=//input[@id="nombres"]');
        const userApellidosInput = page.locator('xpath=//input[@id="apellidos"]');
        const userFechaNacimientoInput = page.locator('xpath=//input[@id="fechaNacimiento"]');
        const userSexoMasculinoInput = page.locator('xpath=//input[@id="sexoM"]');
        const userSaldoInput = page.locator('xpath=//input[@id="saldo"]');

        const birthDate = '1996-06-22';
        const age = calculateAge(birthDate).toString();

        await userRutInput.fill('111111111');
        await userNombresInput.fill('Juan Carlos');
        await userApellidosInput.fill('Bodoque Triviño');
        await userFechaNacimientoInput.fill(birthDate);
        await userSexoMasculinoInput.check();
        await userSaldoInput.fill('100000');

        const submitButton = page.locator('xpath=//button[@type="submit" and normalize-space(text())="Enviar"]');
        await expect(submitButton).toBeEnabled();
        await submitButton.click();

        const usersTable = page.locator('xpath=//table');
        await expect(usersTable).toBeVisible();

        const userId = page.locator('xpath=//table/tbody/tr[1]/td[1]');
        await expect(userId).toHaveText('1');
        const userRut = page.locator('xpath=//table/tbody/tr[1]/td[2]');
        await expect(userRut).toHaveText('11.111.111-1');
        const userNombres = page.locator('xpath=//table/tbody/tr[1]/td[3]');
        await expect(userNombres).toHaveText('Juan Carlos');
        const userApellidos = page.locator('xpath=//table/tbody/tr[1]/td[4]');
        await expect(userApellidos).toHaveText('Bodoque Triviño');
        const userFechaNacimiento = page.locator('xpath=//table/tbody/tr[1]/td[5]');
        await expect(userFechaNacimiento).toHaveText('1996-06-22');
        const userEdad = page.locator('xpath=//table/tbody/tr[1]/td[6]');
        await expect(userEdad).toHaveText(age.toString());
        const userSexo = page.locator('xpath=//table/tbody/tr[1]/td[7]');
        await expect(userSexo).toHaveText('M');
        const userSaldo = page.locator('xpath=//table/tbody/tr[1]/td[8]');
        await expect(userSaldo).toHaveText('$100.000');
    });

    test('Users footer link is active', async ({ page }) => {
        const usersLink = page.locator('xpath=//a[@href="/users" and normalize-space(text())="USERS"]');
        await expect(usersLink).toHaveClass(/text-white/);
    });
});