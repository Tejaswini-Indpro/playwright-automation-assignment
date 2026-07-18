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




async selectIfElement(ruleId: string, element: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  const ifElement = frame
    .locator(`#${ruleId}`)
    .locator('input[placeholder="Select element"]')
    .first();

  await ifElement.click();
  await frame.getByText(element, { exact: true }).click();
}

async selectIfCondition(ruleId: string, condition: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  const conditionInput = frame
    .locator(`#${ruleId}`)
    .locator('input[placeholder="Select condition"]');

  await conditionInput.click();
  await frame.getByText(condition, { exact: true }).click();
}
async enterIfValue(ruleId: string, value: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  const valueInput = frame
    .locator(`#${ruleId}`)
    .locator('input[placeholder="Enter value"]');

  await valueInput.fill(value);
}
async selectThenElement(ruleId: string, element: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  const thenElementInput = frame
    .locator(`#${ruleId}`)
    .locator('input[placeholder="Select element"]')
    .last();

  await thenElementInput.click();

  await frame
    .locator(".rio-select-input-dropdown-option")
    .filter({ hasText: element })
    .click({ force: true });
}

async selectThenAction(ruleId: string, action: string) {
  const frame = this.page.locator("iframe").first().contentFrame();

  const actionInput = frame
    .locator(`#${ruleId}`)
    .locator('input[placeholder="Select action"]');

  await actionInput.click();

  await frame.getByText(action, { exact: true }).click();
}

async createRule(
    ruleId: string,
    ifElement: string,
    condition: string,
    value: string,
    thenElement: string,
    action: string
) {
    await this.selectIfElement(ruleId, ifElement);
    await this.selectIfCondition(ruleId, condition);
    await this.enterIfValue(ruleId, value);
    await this.selectThenElement(ruleId, thenElement);
    await this.selectThenAction(ruleId, action);
}

async clickAddRule() {
    const frame = this.page.locator("iframe").first().contentFrame();

    await frame.getByRole("button", { name: "Add rule" }).click();
}

async verifyRules() {
    const frame = this.page.locator("iframe").first().contentFrame();

    await expect(frame.getByText("Rule1")).toBeVisible();
    await expect(frame.getByText("Rule2")).toBeVisible();
    await expect(frame.getByText("Rule3")).toBeVisible();
}

}