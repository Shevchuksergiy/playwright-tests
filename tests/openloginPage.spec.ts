import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../app/pages/login.page';
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

test.only('GET request to playrate API', async ({ request }) => {
  const inboxId = '67ae172d1a36c500131ec80e'; // ID поштової скриньки
    const email = 'c203d557831-dcd27d+any.alias@inbox.of-it.org'; // Кому надіслано листа
    const subject = 'Email Confirmation - You’re One Click Away'; // Тема листа
    const token = 'Bearer d3bedaed336773e7460d5b4577750b54'; // Токен

    // Формуємо URL з параметрами пошуку
    const searchQuery = `mail.to.address:${email};mail.subject:${subject}`;
    const url = `https://mailcap.of-it.org/api/v1/inboxes/${inboxId}/messages?search=${encodeURIComponent(searchQuery)}`;

    // Виконуємо GET-запит
    const response = await request.get(url, {
        headers: {
            'Authorization': token, // Якщо потрібен токен авторизації
            'Accept': 'application/json'
        }
    });

    // Перевіряємо статус відповіді
    expect(response.status()).toBe(200);

    // Розбираємо JSON-відповідь
    const data = await response.json();
    const textEmail = data[0].mail.text
    // Регулярное выражение для поиска ссылок
    let regex = /\[([^\]]+)\]/g;

// Извлечение ссылки
let links = textEmail.match(regex);
// Регулярное выражение для поиска всех ссылок, начинающихся с https://cdpjdfciwmhoefhqahgt.supabase.co/auth/v1/
let regex2 = /\[https:\/\/cdpjdfciwmhoefhqahgt\.supabase\.co\/auth\/v1\/[^\]]+\]/;

// Извлекаем ссылку из массива
let extractedLink = links.find(link => regex2.test(link));

// Очищаем от квадратных скобок
if (extractedLink) {
  extractedLink = extractedLink.replace(/\[|\]/g, ''); // Убираем квадратные скобки
  console.log(extractedLink); // Выводим результат
} else {
  console.log("Ссылка не найдена");
}

    //console.log(links);

    // Перевіряємо, що отримано хоча б один лист
    //expect(data.length).toBeGreaterThan(0);
});