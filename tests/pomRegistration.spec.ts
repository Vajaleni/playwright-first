import { test, expect } from '@playwright/test';
import {RegistrPage} from './pages/RegistrPage'; 

test.describe('Registration Tests', () => {

    test('positiv test- login to page', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('Jackie', 'Chan','aga-extraChan@gmail.com', 'testPwd7','testPwd7')
        await registrPage.completedForm();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')

    });

    test('negativ test- empty required fields', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('','','','','');
       
        await expect(registrPage.registerButton).toBeDisabled();
        await expect(page).toHaveURL('https://qauto.forstudy.space/')

    }); 

    test('negativ test- name > 20 symbols', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('Olgsdfghtrewhjvn67gfdgjkrd','Bot','aqa-exxamlena@gmail.com','testPwd3','testPwd3');
       
        await expect (page.locator('text="Name has to be from 2 to 20 characters long"')).toBeVisible();
        await expect(registrPage.registerButton).toBeDisabled();
        await expect(page).toHaveURL('https://qauto.forstudy.space/')

    }); 
    
    test('negativ test- name < 20 symbols', async ({page}) => {
        const registrPage = new RegistrPage(page);
        await registrPage.goto();
        await registrPage.openRegistrModal();
        await registrPage.fillRegistrForm('O','Bot','aqa-exxamlena@gmail.com','testPwd3','testPwd3');
       
        await expect (page.locator('text="Name has to be from 2 to 20 characters long"')).toBeVisible();
        await expect(registrPage.registerButton).toBeDisabled();
        await expect(page).toHaveURL('https://qauto.forstudy.space/')
    });

        test('negativ test- invalid email without "@"', async ({page}) => {
            const registrPage = new RegistrPage(page);
            await registrPage.goto();
            await registrPage.openRegistrModal();
            await registrPage.fillRegistrForm('Olga','Bot','aqa-exxamlenagmail.com','testPwd3','testPwd3');
            
            await expect (page.locator('text="Email is incorrect"')).toBeVisible();
            await expect(registrPage.registerButton).toBeDisabled();
            await expect(page).toHaveURL('https://qauto.forstudy.space/')
        });

        test('negativ test- invalid email without "domen"', async ({page}) => {
            const registrPage = new RegistrPage(page);
            await registrPage.goto();
            await registrPage.openRegistrModal();
            await registrPage.fillRegistrForm('Olga','Bot','aqa-exxamlenam@','testPwd3','testPwd3');
            
            await expect (page.locator('text="Email is incorrect"')).toBeVisible();
            await expect(registrPage.registerButton).toBeDisabled();
            await expect(page).toHaveURL('https://qauto.forstudy.space/')
        });

        test('negativ test- invalid email passwords do not match', async ({page}) => {
            const registrPage = new RegistrPage(page);
            await registrPage.goto();
            await registrPage.openRegistrModal();
            await registrPage.fillRegistrForm('Olga','Bot','aqa-exxamlenam@gmail.com','testPwd4','testPwd7');
            
            await expect(registrPage.registerButton).toBeDisabled();
            await expect(page).toHaveURL('https://qauto.forstudy.space/')
        });

});


