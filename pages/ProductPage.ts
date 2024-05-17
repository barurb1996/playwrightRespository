import {Page} from '@playwright/test';

export class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static selectors = {
        productsPageText: '#productsPageId',
        searchInput: '#searchProductId',
        searchButton: '#searchButtonId',
        resultsLoaded: 'selector-for-results-loaded',
        applyFiltersButton: '#applyFilersId',
        productItem: '.product-item',
        productTitle: '.product-title',
        productCategory: '.product-category',
        productBrand: '.product-brand',
        addProductToCartButton: '#addProductToCartId',
        categoryFilter: (category: string) => `text=${category}`,
        brandFilter: (brand: string) => `text=${brand}`
    };

    async productPageIsLoaded() {
        await this.page.waitForSelector(ProductPage.selectors.productsPageText);
    }

    async searchForProducts(keyword: string) {
        await this.page.fill(ProductPage.selectors.searchInput, keyword);
        await this.page.click(ProductPage.selectors.searchButton);
    }

    async waitForResultsToLoad() {
        await this.page.waitForSelector(ProductPage.selectors.resultsLoaded);
    }

    async applyCategoryFilter(category: string) {
        await this.page.click(ProductPage.selectors.categoryFilter(category));
    }

    async applyBrandFilter(brand: string) {
        await this.page.click(ProductPage.selectors.brandFilter(brand));
    }

    async applyFilters(category: string, brand: string) {
        await this.applyBrandFilter(brand);
        await this.applyCategoryFilter(category);
    }

    async getDisplayedProducts() {
        return this.page.$$eval(ProductPage.selectors.productItem, items =>
            items.map(item => ({
                title: item.querySelector(ProductPage.selectors.productTitle)?.textContent,
                category: item.querySelector(ProductPage.selectors.productCategory)?.textContent,
                brand: item.querySelector(ProductPage.selectors.productBrand)?.textContent
            }))
        );
    }

    async verifyProductsMatchCategory(category: string) {
        const products = await this.getDisplayedProducts();
        for (const product of products) {
            if (product.category !== category) {
                throw new Error(`Product ${product.title} is not in the category ${category}.`);
            }
        }
    }

    async verifyProductsMatchBrand(brand: string) {
        const products = await this.getDisplayedProducts();
        for (const product of products) {
            if (product.brand !== brand) {
                throw new Error(`Product ${product.title} is not of the brand ${brand}.`);
            }
        }
    }

    async verifySelectedProducts(category: string, brand: string) {
        await this.verifyProductsMatchBrand(brand);
        await this.verifyProductsMatchCategory(category);
    }

    async selectProduct(productName: string) {
        await this.page.click(`.product-title:has-text("${productName}").`);
    }

    async addToCart() {
        await this.page.click(ProductPage.selectors.addProductToCartButton);
    }
}
