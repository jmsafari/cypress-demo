/// <reference types="cypress" />

/** @type {import('../../support/pages/LoginPage').LoginPage} */
import loginPage from "../../support/pages/LoginPage";

/*
 * We are testing the e-commerce test website 'https://www.saucedemo.com'
 *  
 * Test the initial Login Page State:
 * - Validate the presence of the website logo.
 * - Verify the username field is empty by default and enabled.
 * - Verify the password field is empty by default and enabled.
 * - Verify the password field is of type "password".
 * - Ensure the "Login" button is visible and enabled.
 * - Ensure no error message is showing.
 */ 


describe('Authentication: Login Screen', () => {

    context('Initial UI State',()=>{
          
          beforeEach(()=>{
             cy.visit("/");
          })

          it('Should display all elements in their default state',()=>{

            loginPage.isThereLogo('Swag Labs');
            loginPage.isUsernameFieldEmpty();
            loginPage.isUsernameFieldEnabled();
            loginPage.isPasswordFieldEmpty();
            loginPage.passwordInput.should('have.attr','type','password');
            loginPage.isPasswordFieldEnabled();
            loginPage.checkLoginButtonLabel('Login');
            loginPage.isLoginButtonEnabled();
            loginPage.loginErrorMessage.should('not.exist');
          })   
    })
})