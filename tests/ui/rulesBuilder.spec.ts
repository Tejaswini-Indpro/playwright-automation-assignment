import { test } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { FormPage } from '../../pages/FormPage';

import formData from '../../test-data/formData.json';

test('Create Form', async ({ page }) => {

    const login = new LoginPage(page);
    const home = new HomePage(page);
    const form = new FormPage(page);

    await login.navigate(process.env.AA_URL!);

    await login.login(
        process.env.AA_EMAIL!,
        process.env.AA_PASSWORD!
    );

    await home.openAutomation();

    await form.createForm(
        formData.formName,
        formData.description
    );

});