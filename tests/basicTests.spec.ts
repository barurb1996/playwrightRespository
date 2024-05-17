import {test} from '@playwright/test';
import {urls} from '../config/Urls';
import {HomePage} from "../pages/HomePage";
import {SignupPage} from "../pages/SignUpPage";
import {LoginPage} from "../pages/LoginPage";
import {ProductPage} from "../pages/ProductPage";
import {CartPage} from "../pages/CartPage";

const username: string = "testUser123";
const email: string = "testUser+123@gmail.com";
const password: string = "Test123!@#";
const phoneNumber: string = "123456789";
const category: string = 'Laptops';
const brand: string = 'Apple';
const product: string = 'Macbook PRO'
const cartTotal: number = 100;

let homePage: HomePage;

test.describe('Basic flow. Register => login => search => add item to cart.', () => {
    test.beforeAll(async ({page}) => {
        homePage = new HomePage(page);
        await page.goto('http://localhost:8080');
        await homePage.homePageIsLoaded();
    });

    test('Register new user.', async ({page}) => {
        homePage = new HomePage(page);
        const signUpPage: SignupPage = new SignupPage(page);
        await homePage.navigateToRegistration();
        await signUpPage.executeSignup(username, email, password, phoneNumber);
        await signUpPage.acknowledgeSuccessfulRegistration();
    });

    test('Sign in using created user.', async ({page}) => {
        const loginPage: LoginPage = new LoginPage(page);
        await homePage.navigateToLoginPage();
        await loginPage.enterCredentials(username, password);
        await loginPage.verifySuccessfulLogin();
    });

    test('Search product and apply filters. Then verify both.', async ({page}) => {
        const productPage: ProductPage = new ProductPage(page);
        await page.goto(urls.homePage);
        await productPage.productPageIsLoaded();
        await productPage.searchForProducts('electronics');
        await productPage.waitForResultsToLoad();
        await productPage.applyFilters(category, brand);
        await productPage.verifySelectedProducts(category, brand);
    });

    test('Add product to cart and verify proper cart update.', async ({page}) => {
        const productPage: ProductPage = new ProductPage(page);
        const cartPage: CartPage = new CartPage(page);
        await productPage.selectProduct(product);
        await productPage.addToCart();
        await cartPage.verifyCartTotal(cartTotal);
        await cartPage.verifyProductInCart(product, cartTotal);
    });
});



