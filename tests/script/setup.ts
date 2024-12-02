import { chromium, expect, FullConfig } from '@playwright/test';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import userGaragePage from '../pages/userGaragePage'


async function globalSetup(config: FullConfig) {
const browser = await chromium.launch();
const page = await browser.newPage();
const mainPage = new MainPage(page);
await mainPage.open();

const loginPage = await MainPage.clickSignInButton();
const garagePage: userGaragePage = await loginPage.logIn(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
await garagePage.verifyHeader();

await page.context().storageState({ path: '../script/storageState.json' });
await browser.close();
}

export default globalSetup;







