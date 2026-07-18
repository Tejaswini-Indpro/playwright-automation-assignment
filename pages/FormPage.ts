import { BasePage } from './BasePage';

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

        await this.page.waitForTimeout(5000);
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
}