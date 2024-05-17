import {Page} from "@playwright/test";

export class SignupPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static selectors = {
        usernameInput: 'input[name="username"]',
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        phoneNumber: 'input[name="phoneNumber"]',
        confirmPasswordInput: 'input[name="confirmPassword"]',
        submitButton: 'button[type="submit"]',
        acceptTermsButton: '#acceptTermsId',
        successfulSignupButton: '#signUpCompletedId',
    };

    async enterUserData(username: string, email: string, password: string, phoneNumber: string) {
        await this.page.fill(SignupPage.selectors.usernameInput, username);
        await this.page.fill(SignupPage.selectors.emailInput, email);
        await this.page.fill(SignupPage.selectors.phoneNumber, phoneNumber);
        await this.page.fill(SignupPage.selectors.passwordInput, password);
        await this.page.fill(SignupPage.selectors.confirmPasswordInput, password);
    }

    async acceptTerms() {
        await this.page.click(SignupPage.selectors.acceptTermsButton);
    }

    async submitRegistrationData() {
        await this.page.click(SignupPage.selectors.submitButton);
    }

    async executeSignup(username: string, email: string, password: string, phoneNumber: string) {
        await this.enterUserData(username, email, password, phoneNumber);
        await this.acceptTerms();
        await this.submitRegistrationData();
    }

    async acknowledgeSuccessfulRegistration() {
        await this.page.click(SignupPage.selectors.successfulSignupButton);
    }
}