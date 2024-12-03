import { test, expect } from '@playwright/test';

export class RegistrPage{

    nameInput: any;
    lastNameInput: any;
    signInButton: any;
    emailInput: any;
    passwordInput: any;
    repeatPasswordInput: any;
    registerButton: any;
    page: any;
   
    
    constructor(page){
        this.page = page;
        
        this.signInButton = this.page.locator('button.hero-descriptor_btn.btn.btn-primary');
        this.nameInput = this.page.locator('#signupName');
        this.lastNameInput = this.page.locator('#signupLastName');
        this.emailInput = this.page.locator('#signupEmail');
        this.passwordInput = this.page.locator('#signupPassword');
        this.repeatPasswordInput = this.page.locator('#signupRepeatPassword')
        this.registerButton = this.page.getByRole('button', { name: 'Register' });
       
}

async goto() {
    await this.page.goto('/',{waitUntil: 'load'});

    //async navigate() {

        //await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');

};
async openRegistrModal() {
    await this.signInButton.click();
    await this.page.locator('.modal-body').waitFor({ state: 'visible' });

};
async fillRegistrForm(name, lastName,email,password,repeadPassword) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeadPassword);
};

async completedForm() {
    await this.registerButton.click()
}
};



  


