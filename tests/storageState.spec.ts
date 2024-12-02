import { test } from '@playwright/test';
import  userGaragePage  from './pages/userGaragePage';

test.use({ storageState: 'storageState.json' });

test('User can access Garage Page and interact with Add Car button', async ({ page }) => {
  const garagePage = new userGaragePage(page);

  // Проверка, что пользователь сразу попадает на Garage Page
  await garagePage.verifyHeader();

  // Проверка наличия кнопки "Add car"
  const addCarButton = page.locator('button.btn.btn-primary');
  await test.expect(addCarButton).toBeVisible();

  // Клик по кнопке "Add car" и проверка, что открывается модальное окно
  await addCarButton.click();
  const modalWindow = page.locator('.modal-content'); 
  await test.expect(modalWindow).toBeVisible();
});



