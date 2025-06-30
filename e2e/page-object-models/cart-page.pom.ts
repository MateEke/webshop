import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly products: Locator;
  readonly totalValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator('app-cart-product');
    this.totalValue = page.getByTestId('cart-total-value');
  }

  async removeFromCart(productIndex: number) {
    const product = this.products.nth(productIndex);
    const deleteButton = product.locator('button');

    await deleteButton.click();
  }

  getProductAmountInCart(productIndex: number): Locator {
    const product = this.products.nth(productIndex);
    return product.getByTestId('product-amount-in-cart');
  }

  getProductTotalValue(productIndex: number): Locator {
    const product = this.products.nth(productIndex);
    return product.getByTestId('product-total-value');
  }
}
