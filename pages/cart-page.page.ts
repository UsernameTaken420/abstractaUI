import { type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItem: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly nameField: Locator;
  readonly creditCardField: Locator;
  readonly purchaseButton: Locator;
  readonly thankYouText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator("table > tbody > tr");
    this.removeButton = this.cartItem.locator("td:nth-child(4) > a");
    this.checkoutButton = page.getByRole("button");
    this.nameField = page.locator("#name");
    this.creditCardField = page.locator("#card");
    this.purchaseButton = page.getByRole("button", {name: "Purchase"});
    this.thankYouText = page.getByText("Thank you for your purchase!");
  }

  async goto() {
    await this.page.goto('/cart.html')
  }

  async removeFromCart() {
    await this.removeButton.click();
    await this.page.waitForEvent("requestfinished");
    await this.page.waitForLoadState('networkidle');
  }

  async fillData() {
    await this.nameField.fill("George Costanza");
    await this.creditCardField.fill("123456789");
  }

  async placeOrder() {
    await this.purchaseButton.click();
  }
}