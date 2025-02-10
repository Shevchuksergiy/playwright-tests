import { test, expect } from '@playwright/test';

// Тест наличия кнопки на странице
test('Button visibility test', async ({ page }) => {
  
    const contineWithGooglButton = page.locator ('//button/span[contains(.,"Continue with Google")]');
    const contineWithLoginButton = page.locator ('//button/span[contains(.,"Continue with Email")]');
    const inputEmail = page.locator ('//input[@placeholder="name@mail.com"]');
    const errorMessage = page.locator ('//div[@data-testid="toast-content"]');

    await page.goto('https://yard-noty.web.app/');
    await expect(contineWithGooglButton).toBeVisible();
    await expect(contineWithLoginButton).toBeVisible();
    await expect(inputEmail).toBeVisible();
    await (contineWithLoginButton).click();

     // Ждем 0.5 секунды перед кликом
     await page.waitForTimeout(1500);
      // Проверяем, что появилось сообщение об ошибке
    await expect(errorMessage).toBeVisible();

    
  
   
    
  });