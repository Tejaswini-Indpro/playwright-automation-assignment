import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async fill(locator: string, value: string) {
        await this.page.locator(locator).fill(value);
    }

    async wait(milliseconds: number) {
        await this.page.waitForTimeout(milliseconds);
    }

    async getTitle() {
        return await this.page.title();
    }

    async screenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }

    async waitForPage() {
    await this.page.waitForLoadState('networkidle');
}
}