import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { generateRandomString, generateRandomEmail } from '../utils/helper';

dotenv.config();

test('Scenario A - User registration', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);

  const username = generateRandomString('user');
  const email = generateRandomEmail();
  const password = 'TestPassword123!';

  await loginPage.navigate();
  await loginPage.clickRegisterHere();

  await registerPage.fillUsername(username);
  await registerPage.fillEmail(email);
  await registerPage.fillPassword(password);
  await registerPage.fillConfirmPassword(password);
  await registerPage.clickRegister();

  await expect(page).toHaveURL(/login\.html/);
});

test('Scenario B - Negative login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.fillUsername('invalidUser');
  await loginPage.fillPassword('invalidPass');
  await loginPage.clickSignIn();

  await expect(page.getByText('Invalid username or password')).toBeVisible();
});

test('Scenario B - Positive login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.fillUsername(process.env.ADMIN_USERNAME!);
  await loginPage.fillPassword(process.env.ADMIN_PASSWORD!);
  await loginPage.clickSignIn();

  await expect(page).toHaveURL(/index\.html/);
});