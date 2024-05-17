import {expect, Page} from "@playwright/test";

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static selectors = {
        searchInput: '#searchInputId',
        searchButton: '#searchButtonId',
        signUpButton: '#signUpButton',
        signInButton: '#signInButton',
        productsButton: "#productsButtonId",
        logo: '#logo'
    };

    async searchForProduct(product: string) {
        await this.page.fill(HomePage.selectors.searchInput, product);
        await this.page.click(HomePage.selectors.searchButton);
    }

    async navigateToRegistration() {
        await this.page.click(HomePage.selectors.signUpButton);
    }

    async navigateToLoginPage() {
        await this.page.click(HomePage.selectors.signInButton)
    }

    async navigateToProductsPage() {
        await this.page.click(HomePage.selectors.productsButton)
    }

    async homePageIsLoaded() {
        await this.page.isVisible(HomePage.selectors.logo);
        const title: string = await this.page.title();
        expect(title).toContain(title);
    }
}
