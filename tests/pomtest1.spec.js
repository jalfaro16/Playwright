import { test, expect } from '@playwright/test';

import { selectProduct } from "../utils/helpers";
import { LoginPage } from '../pages/LoginPage';
import { LandingPage } from '../pages/LandingPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { FinalPage, FinalPagePage } from '../pages/FinalPage';
//let testData; // Declare a variable to store the fixture data
import testData from '../utils/testData.json' assert { type: "json" };

test.beforeAll(async () => {
  // Load fixture data before all tests
  //console.log(testData); 
  console.log('Execute beforeEach ALL')
});

test.beforeEach(async ({}, testInfo) => {
  console.log('Execute beforeEach Test1')
});

test('Login Test', async ({ page },testInfo) => {
  
  console.log(testData.name); //access data from utilis/testData.js
  console.log(testData.gender);
  const { user, password, url, url2,
  confMsg, expectedProducts } = testInfo.project.use; //access data from playwright.config.js

  const loginPage = new LoginPage(page);
  const landingPage = new LandingPage(page);
  const checkOutPage = new CheckoutPage(page);
  const finalPage = new FinalPage(page);

  //****Loging Page****//
  await page.goto(url);
  await loginPage.login(user, password);
  await expect(page).toHaveURL(url2);
  await page.waitForLoadState('load');

  //await expect(page.locator('text=Home')).toBeVisible();
  // o con getByText si es texto exacto
  //await expect(page.getByText('ProtoCommerce Home')).toBeVisible();
  await expect(page.locator('a.navbar-brand', { hasText: 'ProtoCommerce Home' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'ProtoCommerce Home', exact: true })).toBeVisible();

  await expect(page.locator('a.nav-link.btn.btn-primary')).toBeVisible();
  await expect(page.locator('a.nav-link', { hasText: 'Checkout' })).toBeVisible();
  await expect(page.locator('text=Checkout')).toBeVisible();

  await expect(page.getByText('Copyright © ProtoCommerce 2018')).toBeVisible();
  await expect(page.locator('footer')).toContainText('© ProtoCommerce');

  //regex
  await expect(page.getByText(/ProtoCommerce Home/)).toBeVisible();


  //****Landing Page****//
  //Verify LandingPage is properly displayed:
  //Select products from the options list:

 //const cards = page.locator('app-card'); // todas las tarjetas
  
  const cards = await landingPage.getProductsListL();
  //const cards = landingPage.getProductsListL();
  const totalCards = await cards.count();

  for (let i = 0; i < totalCards; i++) {
    const card = cards.nth(i);
    const titulo = await card.locator('h4.card-title a').innerText();
    const precio = await card.locator('h5').innerText();

    console.log(`Producto ${i + 1}: ${titulo} - ${precio}`);
  }

 

  const products = await page.$$(await landingPage.getProductsList()); // Obtener todos los productos
  //console.log(products);
  for (const product of products) {
      const productNameElement = await product.$(await landingPage.getProductTitle()); // Buscar el nombre del producto dentro del card
      const productName = await productNameElement.textContent();
      if (expectedProducts.includes(productName.trim())) {
          const addToCartButton = await product.$(await landingPage.getAddButton());
          await addToCartButton.click();
      }
      console.log(await productNameElement.textContent());
  }
      //Go to CheckOut Screen:
      await landingPage.checkOutClick();
      await expect(page).toHaveURL(url2);
      await page.waitForLoadState('load');

//****CheckOut Page****//
//Verify CheckoutPage Products are present:
//await page.pause();
const checkoutProducts = await page.$$(await checkOutPage.getCheckOutlist()); 
//await page.pause();
const countP = checkoutProducts.length;
  const actualProducts = new Array(expectedProducts.length)
  for(let i =0; i<countP; i++ ){
  actualProducts[i] = await checkoutProducts[i].evaluate(el => 
    el.textContent.trim());
  }
console.log(actualProducts);
// Aserción para comprobar que los arrays son iguales
await expect(actualProducts).toEqual(expectedProducts); 
// Verify CheckoutPage Products Total Price:
let sum = 0;
//const prices = await page.$$('tr td:nth-child(4) strong'); // Select all price elements
const prices = await page.$$(await checkOutPage.getPrices()); 
for (const priceElement of prices) {
    const actualText = await priceElement.textContent(); // Get the text content
    let res = actualText.split(" ");
    res = res[1].trim();
    sum += Number(res); // Convert to number and add to sum
}
console.log(`Calculated sum: ${sum}`); // Log calculated sum
// Get the Total Price value displayed on the page:
const finalText = await page.locator(await checkOutPage.getTotal()).textContent();
const finalParts = finalText.split(" ");
const total = Number(finalParts[1].trim());
// Playwright assertion to compare total and sum
await expect(total).toBe(sum);
//Go to next Screen
await checkOutPage.checkOutClick();

//****Final Page****//
//Final Page - Enter final details and confirm purshase:
await expect(page).toHaveURL(url2);
// Fill the country input field
await finalPage.selectCountry('Ind','India');
await finalPage.selectCheckBox()
await finalPage.confirmPurshase();
const alertText = await finalPage.getSuccessAlertText();
//Verify confirmation message.
await expect(alertText).toContain(confMsg);

});





