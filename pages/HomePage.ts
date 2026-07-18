import { BasePage } from './BasePage';

export class HomePage extends BasePage {

    async openAutomation() {
        await this.page.getByRole('link', { name: 'Automation', exact: true }).click();
    }

    async clickCreate() {
        await this.page
            .getByRole('heading', { name: 'Automation Create Manage' })
            .getByLabel('Create')
            .click();
    }

    async clickForm() {
        await this.page.getByRole('button', { name: /Form/ }).click();
    }
}