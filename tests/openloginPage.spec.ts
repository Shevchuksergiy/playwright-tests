import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../app/pages/login.page';
import { User } from '../app/helpers/user';

// Наличия кнопки на странице
test('Check web elements', async ({ page }) => {

  const loginPage = new LoginPage(page)  

    await loginPage.goto();
    await loginPage.checkWebElements();
});

// При нажатии на кнопку Continue with Email с пустым полем появляется ошибка
test('An error appears when clicking the Continue with Email button with an empty field.', async ({ page }) => {

  const loginPage = new LoginPage(page)
    
    await loginPage.goto();
    await loginPage.loginButtonClick();
    await loginPage.checkPopupErrorMessage();
});

// Отображается попап об успехе, после нажатии на кнопку Continue with Email с правильно заполненным полем 
test('A success popup is displayed after clicking the Continue with Email button with a correctly filled field.', async ({ page }) => {

  const loginPage = new LoginPage(page)

    await loginPage.goto();
    await loginPage.enterEmail(`test@mail.com`);
    await loginPage.loginButtonClick();
    await loginPage.checkSuccessMessage(`test@mail.com`); 
});

// Отображается текст об ошибке, после нажатии на кнопку Continue with Email с введённым Email без собаки 
test('An error message is displayed after clicking the Continue with Email button with an email entered without the @ symbol..', async ({ page }) => {

  const loginPage = new LoginPage(page)

  await loginPage.goto();
  await loginPage.enterEmail('aAbB11');
  await loginPage.loginButtonClick();
  await loginPage.checkErrorMessage();    
  
     
});

// Логин через Email
test.only('Login with Email', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const user = new User()
  await loginPage.loginUsingEmail(user);
  console.log (user.email, user.name)
   
  
     
});