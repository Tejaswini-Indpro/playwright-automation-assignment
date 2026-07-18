import { test } from '@playwright/test';

test('Login and save session', async ({ page }) => {

  await page.goto(process.env.AA_URL!);

  // Fill username
  await page.locator('input[name="username"]').fill(process.env.AA_EMAIL!);

  // Fill password
  await page.locator('input[name="password"]').fill(process.env.AA_PASSWORD!);

  // Click Login
  await page.getByRole('button', { name: 'Log in' }).click();

  console.log('=================================================');
  console.log('Complete the CAPTCHA manually.');
  console.log('When you reach the dashboard, the session will be saved.');
  console.log('=================================================');

  // Wait until dashboard opens
  await page.waitForURL(/home/, {
    timeout: 300000 // 5 minutes
  });

  // Save authenticated session
  await page.context().storageState({
    path: 'auth/storageState.json'
  });

  console.log('✅ Login session saved successfully!');
});