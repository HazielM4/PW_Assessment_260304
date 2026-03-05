import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addProduct(name: string, sku: string, price: string, category: string) {
  await this.page.locator('#product-name').fill(name);
  await this.page.locator('#product-sku').fill(sku);
  await this.page.locator('#product-price').fill(price);
  await this.page.locator('#product-category').selectOption(category);
  const saveButton = this.page.locator('button[type="submit"]');
  await saveButton.scrollIntoViewIfNeeded();
  await saveButton.click();
}

  async filterByCategory(category: string) {
  await this.page.locator('#category-filter').selectOption(category);
}

  async deleteProduct(productName: string) {
  const row = this.page.locator('.product-card', { hasText: productName });
  await row.getByRole('button', { name: 'Delete' }).click();
  await this.page.getByRole('button', { name: 'Delete' }).last().click();
}

  async isProductVisible(productName: string): Promise<boolean> {
    return await this.page.locator('.product-card', { hasText: productName }).isVisible();
  }
}