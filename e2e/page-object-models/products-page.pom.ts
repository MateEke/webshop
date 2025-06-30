import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('app-product');
  }

  async addProductToCart(productIndex: number, quantity: number) {
    const product = this.products.nth(productIndex);
    const quantityInput = product.locator('input[type="number"]');

    await quantityInput.fill(quantity.toString());
    await product.locator('img').click();
  }

  async removeFromCart(productIndex: number) {
    const product = this.products.nth(productIndex);
    const quantityInput = product.locator('input[type="number"]');

    await quantityInput.fill('0');
    await product.locator('img').click();
  }

  getProductErrorMessage(productIndex: number): Locator {
    const product = this.products.nth(productIndex);
    return product.getByTestId('product-error-message');
  }

  getProductStock(productIndex: number): Locator {
    const product = this.products.nth(productIndex);
    return product.getByTestId('product-stock');
  }
}
