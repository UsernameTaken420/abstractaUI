import { test, expect } from '@playwright/test';
import { StoreMainPage } from '../pages/store-main-page.page';
import { writeFileSync } from 'fs';

test('Get product info', async ({ page }) => {
  // generate a CSV file with articleName, articlePrice, articleLink
  // the h4 for each card has the name and link
  // h5 has the price
  const mainPage = new StoreMainPage(page);
  await mainPage.goto();
  await expect(mainPage.productsOnScreen).toBeVisible();
  var prices = await mainPage.itemPrice.allTextContents();
  var names = await mainPage.itemLink.allInnerTexts();
  var links = await mainPage.getHrefs();
  await mainPage.clickNext();
  names = names.concat(await mainPage.itemLink.allInnerTexts());
  prices = prices.concat(await mainPage.itemPrice.allTextContents());
  links = links.concat(await mainPage.getHrefs());
  var document = "";
  for (let i = 0; i < names.length; i++) {
    document = document + names[i] + "," + prices[i] + "," + links[i] + "\n";
  }
  writeFileSync("products.csv", document);
});