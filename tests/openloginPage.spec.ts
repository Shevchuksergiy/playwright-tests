import { test, expect } from '@playwright/test';

// Тест наличия кнопки на странице
test('Button visibility test', async ({ page }) => {
  
    const contineWithGooglButton = page.locator ('//button/span[contains(.,"Continue with Google")]');
    const contineWithLoginButton = page.locator ('//button/span[contains(.,"Continue with Email")]');
    const inputEmail = page.locator ('//input[@placeholder="name@mail.com"]');
    const errorMessage = page.locator ('//div[@data-testid="toast-content"]');
    const errorMessage2 = page.locator ('//div[@id="input-1-messages"]');

    await page.goto('https://yard-noty.web.app/');
    await expect(contineWithGooglButton).toBeVisible();
    await expect(contineWithLoginButton).toBeVisible();
    await expect(inputEmail).toBeVisible();
    await (contineWithLoginButton).click();

    // Ждем 0.5 секунды перед кликом
    await page.waitForTimeout(500);
    await expect(errorMessage).toBeVisible();

    // Вводим текст в поле рабочий email
    await inputEmail.fill('test@example.com');
    await (contineWithLoginButton).click();
    await page.waitForTimeout(5000);
    await expect(errorMessage).toBeVisible();

    // Вводим текст в поле кривой email
    await inputEmail.fill('aAbB11');
    await (contineWithLoginButton).click();
    await expect(errorMessage2).toBeVisible();

    

    
    
  
   
    
  });