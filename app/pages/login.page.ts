import { PageHolder } from "./pageHolder";
import {  expect, test } from '@playwright/test';
import { EmailCopHelper } from "../helpers/maillHelper";
import { User } from '../helpers/user';
import { step } from '../helpers/reports/step';

export class LoginPage extends PageHolder{

    private emailCopHelper = new EmailCopHelper(this.page.request)
    private continueWithGooglButton = this.page.locator ('//button/span[contains(.,"Continue with Google")]');
    private continueWithLoginButton = this.page.locator ('//button/span[contains(.,"Continue with Email")]');
    private inputEmail = this.page.locator ('//input[@placeholder="name@mail.com"]');
    private popupErrorMessage = this.page.locator ('//div[@data-testid="toast-icon-error"]/following-sibling::div');
    private popupSuccessMessage = this.page.locator ('//div[@data-testid="toast-icon-success"]/following-sibling::div');
    private errorMessage = this.page.locator ('//div[@id="input-1-messages"]');

async goto() {
    await this.page.goto('');
}

@step("Нажатие на кнопку Continue with Email ")
async loginButtonClick() {
    await (this.continueWithLoginButton).click();
}

@step("Заполнение поля логина ")
async enterEmail(email:string) {
    await this.inputEmail.fill(email);
}

@step("Проверка наличия всех доступных элементов ")
async checkWebElements() {
    await expect.soft(this.continueWithGooglButton).toBeVisible();
    await expect.soft(this.continueWithLoginButton).toBeVisible();
    await expect.soft(this.inputEmail).toBeVisible();
    expect(test.info().errors).toHaveLength(0);
}

@step("Появляется всплывающее подтверждающее отправку email - A sign-in link has been sent to email")
async checkSuccessMessage(email:string) { 
    await expect(this.popupSuccessMessage).toBeVisible();
    await expect(this.popupSuccessMessage).toHaveText(`A sign-in link has been sent to ${email}`);
}

@step("Появляется всплывающее окно ошибки - One of email or phone must be set")
async checkPopupErrorMessage() {
    await expect(this.popupErrorMessage).toBeVisible();
    await expect(this.popupErrorMessage).toHaveText(`One of email or phone must be set`);
}

@step("Появляется ссобщение ошибки - You have an invalid email value")
async checkErrorMessage() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toHaveText(`You have an invalid email value`);
}

@step("Логинимся используя сгенерированный email")
async loginUsingEmail(user:User) {
    await this.goto();
    await this.enterEmail(user.email);
    await this.loginButtonClick();
    let link = await this.emailCopHelper.extractLink(user.email, 'Email Confirmation - You’re One Click Away');
console.log(link)
await this.page.goto(link);
await this.page.waitForURL(/.*\/onboarding.*/);

}

};