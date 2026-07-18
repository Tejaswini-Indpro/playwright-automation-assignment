import { test, expect } from '@playwright/test';

test('Dashboard opens using saved session', async ({ page }) => {

    await page.goto('/#/home');

    await expect(page).toHaveURL(/home/);

});