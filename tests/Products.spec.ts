import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { generateRandomString } from '../utils/helper';

dotenv.config();

test('Scenario C - Create, filter and delete product', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  const productName = `Automation Laptop ${generateRandomString('ID')}`;

  // Login first
  await loginPage.navigate();
  await loginPage.fillUsername(process.env.ADMIN_USERNAME!);
  await loginPage.fillPassword(process.env.ADMIN_PASSWORD!);
  await loginPage.clickSignIn();
  await expect(page).toHaveURL(/index\.html/);

  // Create product
  await dashboardPage.addProduct(productName, 'SKU-001', '1500', 'Electronics');
  await expect(page.locator('.product-card', { hasText: productName })).toBeVisible();

  // Filter by category
  await dashboardPage.filterByCategory('Electronics');
  await expect(page.locator('.product-card', { hasText: productName })).toBeVisible();

  // Delete product
  await dashboardPage.deleteProduct(productName);
  await expect(page.locator('.product-card', { hasText: productName })).not.toBeVisible();
});