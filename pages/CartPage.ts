import {Page} from '@playwright/test';

export class CartPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    static selectors = {
        cartItem: '#cartItemId',
        cartItemTitle: '.cart-item-title',
        cartItemPrice: '.cart-item-price',
        cartTotal: '#cartTotalId',
    };

    async verifyProductInCart(productName: string, productPrice: number) {
        const cartItems = await this.page.$$eval(CartPage.selectors.cartItem, items =>
            items.map(item => ({
                title: item.querySelector(CartPage.selectors.cartItemTitle)?.textContent,
                price: parseFloat(item.querySelector(CartPage.selectors.cartItemPrice)?.textContent?.replace('$', '') || '0')
            }))
        );
        const productInCart = cartItems.find(item => item.title === productName && item.price === productPrice);
        if (!productInCart) {
            throw new Error(`Product ${productName} with price ${productPrice} is not in the cart.`);
        }
    }

    async verifyCartTotal(expectedTotal: number) {
        const cartTotal = parseFloat(await this.page.$eval(CartPage.selectors.cartTotal, el => el.textContent?.replace('$', '') || '0'));
        if (cartTotal !== expectedTotal) {
            throw new Error(`Cart total ${cartTotal} does not match expected total ${expectedTotal}.`);
        }
    }
}