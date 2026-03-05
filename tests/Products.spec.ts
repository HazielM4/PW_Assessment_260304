import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { generateRandomString } from '../utils/helper';
import { Product } from '../utils/types';

dotenv.config();

test('Scenario C - Create, filter and delete product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  const product: Product = {
    name: `Automation Laptop ${generateRandomString('ID')}`,
    sku: 'SKU-001',
    price: '1500',
    category: 'Electronics'
  };

  // Login first
  await loginPage.navigate();
  await loginPage.fillUsername(process.env.ADMIN_USERNAME!);
  await loginPage.fillPassword(process.env.ADMIN_PASSWORD!);
  await loginPage.clickSignIn();
  await expect(page).toHaveURL(/index\.html/);

  // Create product
  await dashboardPage.addProduct(product);
  await expect(await dashboardPage.isProductVisible(product.name)).toBe(true);

  // Filter by category
  await dashboardPage.filterByCategory('Electronics');
  await expect(await dashboardPage.isProductVisible(product.name)).toBe(true);

  // Delete product
  await dashboardPage.deleteProduct(product.name);
  await expect(await dashboardPage.isProductVisible(product.name)).toBe(false);
});