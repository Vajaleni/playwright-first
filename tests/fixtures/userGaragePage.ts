import { Page } from '@playwright/test';

export default class userGaragePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyHeader() {
    const header = await this.page.locator('h1'); 
    const isVisible = await header.isVisible();
    if (!isVisible) {
      throw new Error('Garage Page header is not visible!');
    }
  }
}




  
