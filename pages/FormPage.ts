import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class FormPage extends BasePage {

    async createForm(formName: string, description: string) {

        console.log("Form name received:", formName);

        await this.page.getByLabel('Name').fill(formName);

        await this.page.getByLabel('Description (optional)').fill(description);

        console.log("Waiting before clicking 'Create & edit'...");

        // Playwright Inspector will pause here
        //await this.page.pause();

        await this.page.getByRole('button', {
            name: /Create & edit/i
        }).click();

       const frame = this.page
  .locator("iframe")
  .first()
  .contentFrame();

await frame.locator(".formcanvas__leftpane").waitFor({
  state: "visible",
});
    }
async addTwoTextBoxes() {

        const frame = this.page
            .locator('iframe')
            .first()
            .contentFrame();

        const textBox = frame.getByRole('button', {
            name: /Text Box/
        });

        const canvas = frame.locator('.formcanvas__leftpane');

        await textBox.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await canvas.waitFor({
            state: 'visible',
            timeout: 60000
        });

        // ---------- First Text Box ----------
        await textBox.dragTo(canvas);

        await this.page.waitForTimeout(1500);

        // ---------- Second Text Box ----------
        await textBox.dragTo(canvas);

        await this.page.waitForTimeout(3000);

        console.log("Two Text Boxes added successfully");

        
    }

    async inspectProperties() {
    const frame = this.page.locator('iframe').first().contentFrame();

    await this.page.pause();
}
async configureTextBox(
  label: string,
  defaultValue: string,
  minLength: string,
  maxLength: string,
  hint: string,
  toolTip: string,
  required = false
) {
  const frame = this.page
    .locator('iframe')
    .first()
    .contentFrame();

  console.log("Filling Element label...");
  await frame.getByRole('textbox', { name: 'Element label' }).fill(label);

  console.log("Filling Default value...");
  await frame.getByRole('textbox', { name: 'Default value' }).fill(defaultValue);

  console.log("Filling Min...");
  await frame.getByRole('textbox', { name: 'Min' }).click();
  await frame.getByRole('textbox', { name: 'Min' }).fill(minLength);

  console.log("Filling Max...");
  await frame.getByRole('textbox', { name: 'Max' }).click();
  await frame.getByRole('textbox', { name: 'Max' }).fill(maxLength);

  console.log("Filling Hint...");
  await frame.getByRole('textbox', { name: 'Hint below field' }).fill(hint);

  console.log("Filling Tool tip...");
  await frame.locator('textarea[name="toolTip"]').fill(toolTip);

  if (required) {
    console.log("Checking Required...");
    await frame
      .locator('label')
      .filter({ hasText: 'Make field required' })
      .click();
  }

  console.log(`Configured textbox: ${label}`);
}

async clickTextBox(index: number) {
  const frame = this.page
    .locator('iframe')
    .first()
    .contentFrame();

  const textBox = frame.locator(
    `#textbox_editable-field_TextBox${index}`
  );

  await textBox.waitFor({ state: 'visible' });
  await textBox.click();

  await frame
    .getByRole('textbox', { name: 'Element label' })
    .waitFor();


  await this.page.waitForTimeout(1000);
}

async saveForm() {
  const frame = this.page
    .locator('iframe')
    .first()
    .contentFrame();

  console.log("Saving form...");

  await frame
    .getByRole('button', { name: 'save' })
    .click();

  // Wait for the success toast instead of networkidle
  await this.page.getByText(/Successfully saved/i).waitFor({
    state: 'visible',
    timeout: 10000,
  });

  console.log("Form saved successfully");
}

async openFormRules() {
  const frame = this.page
    .locator('iframe')
    .first()
    .contentFrame();

  console.log("Opening Form Rules...");

  const formRulesTab = frame.locator(".form-rule-list");

  await formRulesTab.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await formRulesTab.click();

  console.log("Form Rules opened");

 
}
async clickAddRule() {
  const frame = this.page
    .locator('iframe')
    .first()
    .contentFrame();

  const addRuleButton = frame.getByRole('button', {
    name: 'Add rule',
  });

  await expect(addRuleButton).toBeVisible();
  await expect(addRuleButton).toBeEnabled();

  await addRuleButton.click();

  console.log("Add Rule dialog opened");
}



async selectIfElement(element: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  console.log(`Selecting IF element: ${element}`);

  const ifElement = frame
    .locator("#Rule1")
    .locator('input[placeholder="Select element"]')
    .first();

  await ifElement.click();

  await frame.getByText(element, { exact: true }).click();

  console.log("IF element selected");
}

async selectIfCondition(condition: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  console.log(`Selecting IF condition: ${condition}`);

  const conditionInput = frame
    .locator("#Rule1")
    .locator('input[placeholder="Select condition"]');

  await conditionInput.click();

  await frame.getByText(condition, { exact: true }).click();

  console.log("IF condition selected");
}
async enterIfValue(value: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  console.log(`Entering IF value: ${value}`);

  const valueInput = frame
    .locator("#Rule1")
    .locator('input[placeholder="Enter value"]');

  await valueInput.waitFor({ state: "visible" });
  await valueInput.fill(value);

  console.log("IF value entered");
}
async selectThenElement(element: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  console.log(`Selecting THEN element: ${element}`);

  const thenElementInput = frame
    .locator("#Rule1")
    .locator('input[placeholder="Select element"]')
    .last();

  await thenElementInput.click();

  await frame
    .locator(".rio-select-input-dropdown-option")
    .filter({ hasText: element })
    .click({ force: true });

  console.log("THEN element selected");
}

async selectThenAction(action: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  console.log(`Selecting THEN action: ${action}`);

  const actionInput = frame
    .locator("#Rule1")
    .locator('input[placeholder="Select action"]');

  await actionInput.click();

  await frame.getByText(action, { exact: true }).click();

  console.log("THEN action selected");
}

async createRule(
  ifElement: string,
  condition: string,
  value: string,
  thenElement: string,
  action: string
) {
  await this.selectIfElement(ifElement);
  await this.selectIfCondition(condition);
  await this.enterIfValue(value);

  await this.selectThenElement(thenElement);
  await this.selectThenAction(action);
}

}