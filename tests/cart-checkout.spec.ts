import { test, expect } from '@playwright/test';
import { StoreMainPage } from '../pages/store-main-page.page';
import { ProductPage } from '../pages/product-page.page';
import { CartPage } from '../pages/cart-page.page';

test.beforeEach(async ({ page }) => {
  const mainPage = new StoreMainPage(page);
  await mainPage.goto();
  await expect(mainPage.productsOnScreen).toBeVisible();
  const links = await mainPage.getHrefs();
  const selectedLink = links[Math.floor(Math.random() * links.length)];
  const productPage = new ProductPage(page);
  await page.goto(selectedLink.toString());
  await expect(productPage.addButton).toBeVisible();
  await productPage.addToCart();
});

test('Add product to cart', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await expect(cartPage.cartItem).toBeVisible();
});

test('Remove product from cart', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.removeFromCart();
  await expect(cartPage.cartItem).toHaveCount(0);
});

test('Product checkout', async ({ page }) => {
  const cartPage = new CartPage(page);
  await cartPage.goto();
  await expect(cartPage.checkoutButton).toBeVisible();
  await cartPage.checkoutButton.click(); 
  await cartPage.fillData();
  await cartPage.placeOrder();
  await expect(cartPage.thankYouText).toBeVisible();
});