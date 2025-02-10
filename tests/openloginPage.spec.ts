import { test, expect } from '@playwright/test';

// Тест наличия кнопки на странице
test('Button visibility test', async ({ page }) => {
  
    const contineWithGooglButton = page.locator ('//button/span[contains(.,"Continue with Google")]');
    const contineWithLoginButton = page.locator ('//button/span[contains(.,"Continue with Email")]');
    const inputEmail = page.locator ('//input[@placeholder="name@mail.com"]');

    await page.goto('https://yard-noty.web.app/');
    await expect(contineWithGooglButton).toBeVisible();
    await expect(contineWithLoginButton).toBeVisible();
    await expect(inputEmail).toBeVisible();
  
    
  });