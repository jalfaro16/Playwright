// utils/playwrightHelpers.js

export async function selectProduct(page, productName) {
    const products = await page.$$("h4.card-title"); // Get all product titles
    const addButtons = await page.$$("button.btn-info"); // Get all "Add to Cart" buttons

    for (let i = 0; i < products.length; i++) {
        const text = await products[i].textContent(); // Get product name
        if (text.includes(productName)) {
            console.log(`Adding product: ${productName}`);
            await addButtons[i].click(); // Click the corresponding button
            break; // Stop once the product is found
        }
    }
}
