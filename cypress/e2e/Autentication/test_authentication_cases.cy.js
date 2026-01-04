/// <reference types="cypress" />

/** @type {import('../../fixtures/users_credentials.json').users_credentials} */
/** @type {import('../../support/pages/LoginPage').loginPage} */
import users from '../../fixtures/users_credentials.json';
import loginPage from '../../support/pages/LoginPage';

/*
 * We are testing the e-commerce test website 'https://www.saucedemo.com'
 * 
 * The autentication test cases will cover:   
 * 1. standard user login: (username: 'standard_user' / password: 'secret_sauce')
 * 2. locked_out_user login (username: 'locked_out_user' / password: 'secret_sauce')
 * 3. wrong_credential_user 1 login (username: valid / password: invalid)
 * 4. wrong_credential_user 2 login (username: invalid / password: valid)
 * 5. wrong_credential_user 3 login (username: Empty / password: Empty)
 */ 


describe('User Authentication: Validate various login scenarios', () => {

    /*
    */

    context('Login from the login page which is the home page of the website', ()=>{
          
          beforeEach(()=>{
             cy.visit("/");
          })

          it('Standard User: successful authentication', ()=>{

                const user = users.standardUser;
                loginPage.login(user.username, user.password);  
                cy.url().should('include', user.redirectTo);
          })  

          it('Locked Out User: failed authentication', ()=>{ 

                const user = users.lockedOut;
                loginPage.login(user.username, user.password);  
                cy.url().should('include', user.redirectTo);
                loginPage.loginErrorMessage.should('have.text', user.errorText);
          }) 

          it('Login with valid username AND  invalid password', ()=>{ 

                const user = users.validUserInvalidPassword;
                loginPage.login(user.username, user.password);  
                cy.url().should('include', user.redirectTo);
                loginPage.loginErrorMessage.should('have.text', user.errorText);
          }) 

          it('Login with invalid username AND  valid password', ()=>{ 

                const user = users.invalidUserValidPassword;
                loginPage.login(user.username, user.password);  
                cy.url().should('include', user.redirectTo);
                loginPage.loginErrorMessage.should('have.text', user.errorText);
          }) 

          it('Login with empty username AND empty password', ()=>{ 

                const user = users.emptyUserEmptyPassword;
                loginPage.login(user.username, user.password);  
                cy.url().should('include', user.redirectTo);
                loginPage.loginErrorMessage.should('have.text', user.errorText);
          }) 
    })
})