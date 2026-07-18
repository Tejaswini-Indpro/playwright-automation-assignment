import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login to Automation Anywhere', async ({ page }) => {

    const login = new LoginPage(page);

    await login.navigate(process.env.AA_URL!);

    await login.login(
        process.env.AA_EMAIL!,
        process.env.AA_PASSWORD!
    );

    await expect(page).toHaveURL(/community\.cloud\.automationanywhere\.digital/);
});