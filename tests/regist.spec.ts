import { test, expect } from '@playwright/test';
test.describe('Positive Tests', () => {

test('positive test login to page ', async ({ page }) => {
  // Открываем сайт
  await page.goto('https://qauto.forstudy.space/');
  await page.waitForLoadState('networkidle')
 


  //await page.locator('.hero-descriptor_btn btn btn-primary').waitFor({ state: 'visible' });
  //await page.locator('.hero-descriptor_btn btn btn-primary').click();
  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.waitFor({state:'visible'})
  await signinLocator.click()
//await page.click('text="Sign up"');

  //  появления модального окна
  await page.locator('.modal-body').waitFor({ state: 'visible' });

  //  модальное окно появилось
  await expect(page.locator('.modal-body')).toBeVisible();

  await page.locator('#signupName').fill('Olga');
  await page.locator('#signupLastName').fill('Bot');
  await page.locator('#signupEmail').fill('aqa-examplena@gmail.com');
  await page.locator('#signinPassword').fill('testPwd2');
  await page.locator('#signupRepeatPassword').fill('testpwd2');
  await page.locator('.btn btn-primary').click();
 

  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
  
});

});