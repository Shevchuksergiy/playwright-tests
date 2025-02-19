import { PageHolder } from "./pageHolder";
import {  expect, test } from '@playwright/test';
import { EmailCopHelper } from "../helpers/maillHelper";
import { User } from '../helpers/user';
import { step } from '../helpers/reports/step';

export class OnbordingPage extends PageHolder{

    private emailCopHelper = new EmailCopHelper(this.page.request)
    private forEducation = this.page.locator ('//label/div/div[contains(.,"For education")]');
    private continueButton = this.page.locator ('//button/span[contains(.,"Continue")]');
    private becomeAtopPerformer = this.page.locator ('//span[contains(.,"Become a top performer")]');
    private achievePeaceOfMind = this.page.locator ('//span[contains(.,"Achieve peace of mind")]');
    private feelLessRushedHaveMoreTime = this.page.locator ('//span[contains(.,"Feel less rushed & have more time")]');
    private feelMoreConfidentInMeetings = this.page.locator ('//span[contains(.,"Feel more confident in meetings")]');
    private feelInControlOfMyWorkflow = this.page.locator ('//span[contains(.,"Feel in control of my workflow")]');


    @step("Нажатие на кнопку For education и Continue")
async continueStep1ForEducation() {
    await (this.forEducation).click();
    await (this.continueButton).click();

}

    @step("Ставим галочки на все поля и нажимаем на кнопку Continue")
async continueStep2CheckAll() {
    await (this.becomeAtopPerformer).click();
    await (this.achievePeaceOfMind).click();
    await (this.feelLessRushedHaveMoreTime).click();
    await (this.feelMoreConfidentInMeetings).click();
    await (this.feelInControlOfMyWorkflow).click();
    await (this.continueButton).click();

}

   
}