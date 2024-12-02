import { test, expect } from '@playwright/test';

test('Check Sign In button', async ({ page }) => {
    await page.goto('https://qauto.forstudy.space');
    await page.waitForSelector('button.header_signin', { state: 'visible' });
    const signInButton = page.locator('button.header_signin');
    expect(await signInButton.isVisible()).toBeTruthy();
    console.log('Sign In button is visible and ready for interaction');
});

