import { test, expect } from '@playwright/test';

test('Подмена данных профиля и проверка отображения', async ({ page }) => {
 
  const mockedProfileData = {
    
   "photo": " ",
  "name": "Olena",
  "lastName": "Kar",
  "dateBirth": "12.09.1965",
  "country": "USA"
    
  };

  
  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedProfileData),
    });
  });

  
  await page.goto('https://qauto.forstudy.space/panel/profile');

  
  const nameLocator =  page.locator('#profile_name.display-4');

  await expect(nameLocator).toHaveText('Olena Kar');
});
