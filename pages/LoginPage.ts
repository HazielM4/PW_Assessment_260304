import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/login.html');
  }

  async fillUsername(username: string) {
    await this.page.getByLabel('Username').fill(username);
  }

  async fillPassword(password: string) {
  await this.page.locator('#password').fill(password);
}

  async clickSignIn() {
    await this.page.getByRole('button', { name: 'Sign In' }).click();
  }

  async clickRegisterHere() {
    await this.page.getByRole('link', { name: 'Register here' }).click();
  }
}