import { type Locator, type Page } from '@playwright/test';

export class StoreMainPage {
  readonly page: Page;
  readonly productsOnScreen: Locator;
  readonly nextButton: Locator;
  readonly itemCard: Locator;
  readonly itemPrice: Locator;
  readonly itemLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsOnScreen = page.locator('div#tbodyid');
    this.nextButton = page.locator('button', { hasText: "Next" });
    this.itemCard = this.productsOnScreen.locator('div > div');
    this.itemLink = this.itemCard.locator('div > h4 > a');
    this.itemPrice = this.itemCard.locator('div > h5');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickNext() {
    await this.nextButton.click();
    await this.page.waitForEvent("requestfinished");
    await this.page.waitForLoadState('networkidle');
  }

  async getHrefs() {
    let links: String[] = [];
    for (const link of await this.itemLink.all())
      links.push(this.page.url() + (await link.getAttribute("href"))?.toString());
    return links
  }
}