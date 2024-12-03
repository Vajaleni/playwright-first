import { test, expect } from '@playwright/test';
import {RegistrPage} from './pages/RegistrPage'; 

test.describe('Registration Tests using .env', () => {

    test('positiv test- login to page', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('Jackie', 'Chan','aga-extraChan@gmail.com', 'testPwd7','testPwd7')
        await registrPage.completedForm();
        await expect(page).toHaveURL(`${process.env.BASE_URL}/panel/garage`)

    });

    test('negativ test- empty required fields', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('','','','','');
       
        await expect(registrPage.registerButton).toBeDisabled();
        await expect(page).toHaveURL(process.env.BASE_URL!)

    }); 

})

