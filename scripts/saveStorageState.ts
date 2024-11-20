//Варіант№1

import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import {RegistrPage} from '../pages/RegistrPage'; 

dotenv.config();

(async ( ) => {

    const browser = await chromium.launch();
    const context = await browser.newContext({
        httpCredentials:{
        username: process.env.HTTP_USER_NAME!,
        password: process.env.HTTP_PASSWORD!
        }
    });

    const page = await  context.newPage();
    const registrPage = new RegistrPage(page);

    await RegistrPage.goto();
    await registrPage.openRegistrModal();

    await registrPage.fillRegistrForm('Bob', 'Pincher', 'pincherBob@gmail.com', 'Testik123','Testik123')

    await registrPage.completedForm();

   

    await context.storageState({path : 'storageState.json'});
    await browser.close();
}) ();


//Варіант №2 (без RegistrPage)

import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        httpCredentials: {
            username: process.env.HTTP_USER_NAME!,
            password: process.env.HTTP_PASSWORD!
        }
    });

    const page = await context.newPage();

   
    await page.goto('/', { waitUntil: 'load' });

    
    const signInButton = page.locator('button.hero-descriptor_btn.btn.btn-primary');
    await signInButton.click();
    await page.locator('.modal-body').waitFor({ state: 'visible' });

    
    await page.locator('#signupName').fill('Bob');
    await page.locator('#signupLastName').fill('Pincher');
    await page.locator('#signupEmail').fill('pincherBob@gmail.com');
    await page.locator('#signupPassword').fill('Testik123');
    await page.locator('#signupRepeatPassword').fill('Testik123');

   
    const registerButton = page.getByRole('button', { name: 'Register' });
    await registerButton.click();

    
    await context.storageState({ path: 'storageState.json' });
    await browser.close();
})();
