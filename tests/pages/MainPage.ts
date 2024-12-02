
import { Locator, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

export class MainPage {
  private page: Page;
  private signInButton: Locator;
    static clickSignInButton: any;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = this.page.locator('button.header_signin');
  }

  async open() {
    
    await this.page.goto(process.env.BASE_URL!); 
    //await this.page.waitForLoadState('networkidle');

    await this.page.waitForLoadState('domcontentloaded');
    console.log('Page loaded successfully');

  }

 
      async clickSignInButton () {
        /*await this.signInButton.waitFor({state: 'visible'})
        console.log('Sign In button is ready to be clicked')*/
const isVisible = await this.signInButton.isVisible();
console.log(`Sign In button visibility: ${isVisible}`);

if (!isVisible) {
  throw new Error ('Sign In button is not visibility!')
}


        await this.signInButton.click(); 
        await this.page.locator('.modal-body').waitFor({ state: 'visible' }); 
        return new LoginPage(this.page); 
      }
    };
  


export default MainPage;



