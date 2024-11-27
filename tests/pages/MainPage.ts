
import { Locator, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

export class MainPage {
  private page: Page;
  private signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = this.page.locator('button.header_signin');
  }

  async open() {
    
    await this.page.goto(process.env.BASE_URL!); 
  }

 
      async clickSignInButton () {
        await this.signInButton.click(); 
        await this.page.locator('.modal-body').waitFor({ state: 'visible' }); 
        return new LoginPage(this.page); 
      }
    };
  


export default MainPage;



