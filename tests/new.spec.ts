import { test, expect } from '@playwright/test';

test.describe('Positive Tests', () => {

  test('positive  login to page ', async ({ page }) => {
    
    await page.goto('https://qauto.forstudy.space/');
    
    // Полная загрузки страницы
    await page.waitForLoadState('networkidle');
    
    // по тексту
    const signinLocator = page.locator('text="Sign up"');
    await signinLocator.waitFor({ state: 'visible', timeout: 60000 });
    await signinLocator.click();

    //  появление модального окна
    await page.locator('.modal-body').waitFor({ state: 'visible' });

    //  модальное окно появилось
    await expect(page.locator('.modal-body')).toBeVisible();

    // Заполняю поле email
    await page.locator('#signupName').fill('Olga');
    await page.locator('#signupLastName').fill('Bot');
    await page.locator('#signupEmail').fill('aqa-examplena@gmail.com');
    await page.locator('#signinPassword').fill('testPwd2');
    await page.locator('#signupRepeatPassword').fill('testpwd2');
    
    // Клик по кнопке для завершения регистрации
    await page.locator('.btn.btn-primary').click();

    //  переход на новую страницу
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  });

});
