import { type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.locator("#tbodyid > div.row > div > a");
  }

  async addToCart() {
    await this.addButton.click();
    await this.page.waitForEvent("requestfinished");
    await this.page.waitForLoadState('networkidle');
  }
}