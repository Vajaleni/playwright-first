import { Locator, Page } from '@playwright/test';
import userGaragePage from '../pages/userGaragePage'


export class LoginPage {
  private page: Page;
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = this.page.locator('#signinEmail');
    this.passwordInput = this.page.locator('#signinPassword');
    this.loginButton = this.page.getByRole('button', { name: 'Sign In' });
  }

  async logIn(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    const garagePage = new userGaragePage(this.page)
    return garagePage;
  }
}

export default LoginPage;
