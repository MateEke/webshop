import { expect, test } from '@playwright/test';
import { CartPage } from './page-object-models/cart-page.pom';
import { Header } from './page-object-models/header.pom';
import { ProductsPage } from './page-object-models/products-page.pom';

test('Acceptance Criteriea', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const header = new Header(page);
  const cartPage = new CartPage(page);

  await page.goto('/');

  await test.step('should display products', async () => {
    await expect(productsPage.products).toHaveCount(11);
  });

  await test.step('should not add less than minimum order amount product to cart', async () => {
    await productsPage.addProductToCart(0, 1);
    await expect(productsPage.getProductErrorMessage(0)).toHaveText(
      'Minimum order amount is 5',
    );
  });

  await test.step('reset input', async () => {
    await productsPage.removeFromCart(0);
    await expect(productsPage.getProductErrorMessage(0)).not.toBeVisible();
  });

  await test.step('should not add more than available stock product to cart', async () => {
    await productsPage.addProductToCart(0, 200);
    await expect(productsPage.getProductErrorMessage(0)).toHaveText(
      'Available amount is 150',
    );
  });

  await test.step('reset input', async () => {
    await productsPage.removeFromCart(0);
    await expect(productsPage.getProductErrorMessage(0)).not.toBeVisible();
  });

  await test.step('should add multiple products to cart, and decrement the available amount', async () => {
    let productIndex = 2;
    await expect(productsPage.getProductStock(productIndex)).toContainText(
      '75',
    );
    await productsPage.addProductToCart(productIndex, 1);
    await expect(
      productsPage.getProductErrorMessage(productIndex),
    ).not.toBeVisible();
    await expect(productsPage.getProductStock(productIndex)).toContainText(
      '74',
    );
    await expect(header.headerCartValue).toContainText('499.99');

    productIndex = 5;
    await expect(productsPage.getProductStock(productIndex)).toContainText(
      '100',
    );
    await productsPage.addProductToCart(productIndex, 10);
    await expect(
      productsPage.getProductErrorMessage(productIndex),
    ).not.toBeVisible();
    await expect(productsPage.getProductStock(productIndex)).toContainText(
      '90',
    );
    await expect(header.headerCartValue).toContainText('604.99');
  });

  await test.step('should go to cart', async () => {
    await header.headerCart.click();

    await page.waitForURL('**/cart');
  });

  await test.step('should list products in cart', async () => {
    await expect(cartPage.products).toHaveCount(2);
  });

  await test.step('should display amount and total value for every product', async () => {
    await expect(cartPage.getProductAmountInCart(0)).toContainText('1');
    await expect(cartPage.getProductTotalValue(0)).toContainText('499.99');

    await expect(cartPage.getProductAmountInCart(1)).toContainText('10');
    await expect(cartPage.getProductTotalValue(1)).toContainText('105.00');
  });

  await test.step('should display total value of cart', async () => {
    await expect(cartPage.totalValue).toContainText('604.99');
  });
});
