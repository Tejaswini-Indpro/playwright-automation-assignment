import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { FormPage } from '../../pages/FormPage';

import formData from '../../test-data/formData.json';

test('Create Form', async ({ page }) => {

    const home = new HomePage(page);
    const form = new FormPage(page);

    await page.goto('/#/home');

    await home.openAutomation();

    await home.clickCreate();

    await home.clickForm();

   const uniqueFormName = `Playwright Form ${Date.now()}`;

await form.createForm(
    uniqueFormName,
    formData.description
);

});