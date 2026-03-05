import { Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/register.html');
  }

  async fillUsername(username: string) {
    await this.page.getByLabel('Username').fill(username);
  }

  async fillEmail(email: string) {
    await this.page.getByLabel('Email').fill(email);
  }

  async fillPassword(password: string) {
  await this.page.locator('#reg-password').fill(password);
}

  async fillConfirmPassword(password: string) {
  await this.page.locator('#reg-confirm-password').fill(password);
}

  async clickRegister() {
    await this.page.getByRole('button', { name: 'Register' }).click();
  }
}