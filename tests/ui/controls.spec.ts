import { test } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { FormPage } from '../../pages/FormPage';
import formData from '../../test-data/formData.json';

test('Add two text boxes', async ({ page }) => {

    const home = new HomePage(page);
    const form = new FormPage(page);

    await page.goto('/#/home');

    await home.openAutomation();
    await home.clickCreate();
    await home.clickForm();

   const uniqueFormName = `Playwright Form ${Date.now()}`;
console.log("Creating form:", uniqueFormName);

await form.createForm(
    uniqueFormName,
    formData.description
);
    await form.addTwoTextBoxes();
   

// Configure first textbox
await form.clickTextBox(0);

await form.configureTextBox(
  "First Name",
  "",
  "2",
  "30",
  "Enter first name",
  "First name of the user",
  true
);

await form.clickTextBox(1);

await form.configureTextBox(
  "Last Name",
  "",
  "2",
  "30",
  "Enter last name",
  "Last name of the user",
  true
);

await form.saveForm();


await form.openFormRules();

await form.clickAddRule();

await form.createRule(
    "Rule1",
    "First Name - TextBox0",
    "Contains",
    "Playwright",
    "Last Name - TextBox1",
    "Disable"
);

await form.clickAddRule();

await form.createRule(
    "Rule2",
    "Last Name - TextBox1",
    "Contains",
    "Automation",
    "First Name - TextBox0",
    "Enable"
);

await form.clickAddRule();

await form.createRule(
    "Rule3",
    "First Name - TextBox0",
    "Contains",
    "Test",
    "Last Name - TextBox1",
    "Disable"
);

await form.saveForm();
await form.verifyRules();
});