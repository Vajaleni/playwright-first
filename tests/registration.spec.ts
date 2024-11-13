import { test, expect } from '@playwright/test';
test.describe('Registration Tests', () => {

test('positive test login to page ', async ({ page }) => {
  
  
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  
 const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click()
  await page.locator('.modal-body').waitFor({ state: 'visible' });
  await expect(page.locator('.modal-body')).toBeVisible();

  await page.locator('#signupName').fill('Vanya');
  await page.locator('#signupLastName').fill('Zuk');
  await page.locator('#signupEmail').fill('aqa-extraVanya@gmail.com');
  await page.locator('#signupPassword').fill('testPwd2');
  await page.locator('#signupRepeatPassword').fill('testPwd2');
  await page.getByRole('button', { name: 'Register' }).click();
  
  await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage')
  });



test('negative test - empty required fields', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  
  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click();
  
  await page.locator('#signupName').fill('');
  await page.locator('#signupLastName').fill('');
  await page.locator('#signupEmail').fill('');
  await page.locator('#signupPassword').fill('');
  await page.locator('#signupRepeatPassword').fill('');

  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled
});


  test('negative test - name <2 simbols', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
   
  
    const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
    await signinLocator.click();
  
    await page.locator('#signupName').fill('T');
    await page.locator('#signupLastName').fill('Bot');
    await page.locator('#signupEmail').fill('aqa-examplena@gmail.com');
    await page.locator('#signupPassword').fill('testPwd2');
    await page.locator('#signupRepeatPassword').fill('testPwd2');
  
    const registerButton = page.getByRole('button', { name: 'Register' });
    await expect(registerButton).toBeDisabled
    await expect(page.locator('text="Name has to be from 2 to 20 characters long"')).toBeVisible();
  });


test('negative test - name > 20 simbols', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  await page.waitForLoadState('networkidle');

  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click();
  
  await page.locator('#signupName').fill('OlgaOlgaOlgaOlgaOlga12345fghhjjfffjjff');
  await page.locator('#signupLastName').fill('Bot');
  await page.locator('#signupEmail').fill('aqa-examplena@gmail.com');
  await page.locator('#signupPassword').fill('testPwd2');
  await page.locator('#signupRepeatPassword').fill('testPwd2');
  
  await expect(page.locator('text="Name has to be from 2 to 20 characters long"')).toBeVisible();
  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled
});


test('Невалидный email - без "@" символа', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click();
  
  await page.locator('#signupName').fill('Olivia');
  await page.locator('#signupLastName').fill('Pot');
  await page.locator('#signupEmail').fill('aqa-examplegmail.com');
  await page.locator('#signupPassword').fill('testPwd3');
  await page.locator('#signupRepeatPassword').fill('testPwd3');


  await expect(page.locator('text="Email is incorrect"')).toBeVisible();
   const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled
});


test('negative test - invalid email (without domen)', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click();
  
  await page.locator('#signupName').fill('Olga');
  await page.locator('#signupLastName').fill('Bot');
  await page.locator('#signupEmail').fill('aqa-examplena@');
  await page.locator('#signupPassword').fill('testPwd4');
  await page.locator('#signupRepeatPassword').fill('testPwd4');

  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled
  await expect(page.locator('text="Email is incorrect"')).toBeVisible();
});

test('negative test - passwords do not match', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
  const signinLocator = page.locator('button.hero-descriptor_btn.btn.btn-primary');
  await signinLocator.click();
  
  await page.locator('#signupName').fill('Olga');
  await page.locator('#signupLastName').fill('Bot');
  await page.locator('#signupEmail').fill('aqa-examplena@gmail.com');
  await page.locator('#signupPassword').fill('testPwd5');
  await page.locator('#signupRepeatPassword').fill('testPwd3');
 

  const registerButton = page.getByRole('button', { name: 'Register' });
  await expect(registerButton).toBeDisabled;
  //await expect(page.locator('text="Passwords do not match"')).toBeVisible();
});
});




