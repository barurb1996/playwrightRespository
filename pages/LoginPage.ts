import {expect, Page} from "@playwright/test";

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static selectors = {
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        submitButton: 'button[type="submit"]',
        successfulLoginText: '#loginCompletedId'
    };

    async enterCredentials(email: string, password: string) {
        await this.page.fill(LoginPage.selectors.emailInput, email);
        await this.page.fill(LoginPage.selectors.passwordInput, password);
    }

    async login() {
        await this.page.click(LoginPage.selectors.submitButton);
    }

    async verifySuccessfulLogin() {
        expect(await this.page.isVisible(LoginPage.selectors.successfulLoginText));
    }
}