import { Locator, Page } from '@playwright/test';

export class Header {
  readonly page: Page;
  readonly headerCart: Locator;
  readonly headerCartValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerCart = page.locator('app-header-cart');
    this.headerCartValue = this.headerCart.getByTestId('header-cart-value');
  }

  async getCartValue(): Promise<number> {
    let value = await this.headerCartValue.innerText();
    value = value.replace(/[^0-9.-]+/g, '');

    return parseFloat(value);
  }
}
