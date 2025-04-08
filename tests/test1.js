import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { selectProduct } from "../utils/helpers";



test('Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  await loginPage.login('rahulshettyacademy', 'learning');
  await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
 
  //await page.pause();
  await page.waitForLoadState('load');

  //Verify LandingPage is properly displayed:

  //Select products from the options list:
  const expectedProducts = ["iphone X", "Blackberry"];
  const products = await page.$$('app-card'); // Obtener todos los productos
  for (const product of products) {
      const productNameElement = await product.$('.card-title a'); // Buscar el nombre del producto dentro del card
      const productName = await productNameElement.textContent();
      if (expectedProducts.includes(productName.trim())) {
          const addToCartButton = await product.$('.card-footer button');
          await addToCartButton.click();
      }
      console.log(await productNameElement.textContent());
  }
      await page.click('text=Checkout');
      await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
      await page.waitForLoadState('load');

//Verify CheckoutPage Products are present:
  const checkoutProducts = await page.$$('h4 a'); 
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
const prices = await page.$$('tr td:nth-child(4) strong'); // Select all price elements

for (const priceElement of prices) {
    const actualText = await priceElement.textContent(); // Get the text content
    let res = actualText.split(" ");
    res = res[1].trim();
    sum += Number(res); // Convert to number and add to sum
}

console.log(`Calculated sum: ${sum}`); // Log calculated sum

// Get the Total Price value displayed on the page:
const finalText = await page.locator('h3 > strong').textContent();
const finalParts = finalText.split(" ");
const total = Number(finalParts[1].trim());
// Playwright assertion to compare total and sum
await expect(total).toBe(sum);

//Go to next Screen
await page.getByText('Checkout').click();

//Final Page - Enter final details and confirm purshase:
await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');

// Fill the country input field
await page.locator('#country').pressSequentially('Ind');
await page.locator('.suggestions li').filter({ hasText: 'India' }).click();
// Or using the alternative method:
// await page.locator('#country').fill('Canada');
await page.click('#checkbox2', { force: true });
await page.click('input.btn.btn-success.btn-lg');
const alertText = await page.locator('.alert.alert-success.alert-dismissible').textContent();
//Verify confirmation message.
await expect(alertText).toContain('Success!');

});





