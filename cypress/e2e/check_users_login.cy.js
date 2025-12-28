/// <reference types="cypress" />

/*
 * We would like to make sure the different role below defined on the test e-commerce 
 * website 'https://www.saucedemo.com'
 * 
 * Accepted Usernames to use for the different roles:     
 * 1. standard_user             
 * 2. locked_out_user           
 * 3. wrong_credential_user
 * 
 * Password used for all the users: 'secret_sauce'
 */ 


describe('Login page and User login', () => {

    /*  Anonymous users on the test website 'https://www.saucedemo.com' only access
     *  Home Page which is also the Login page
     */
     
    context('Login page',()=>{

        beforeEach('Get to the Home Page', () =>{
            cy.visit('/');          // baseUrl = https://www.saucedemo.com
        });

        it('Home Page',()=>{

            cy.get('.login_logo').should('have.text','Swag Labs');
            cy.get('[data-test="username"]').should('be.visible').and('have.value','');
            cy.get('[data-test="password"]').should('be.visible').and('have.value','');
            cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
        });
    });

    context('Standard user login',()=>{

        beforeEach('Get to the Home Page then login', () =>{
            cy.loginAs('standard_user','secret_sauce');
        });

        it('Redirection after login',()=>{
            
            cy.get('.app_logo').should('have.text','Swag Labs');
            cy.get('[data-test="title"]').should('have.text','Products');
            cy.get('[data-test="inventory-list"]').find('[data-test="inventory-item"]').should('have.length.gt', 1);
            cy.get('[data-test="product-sort-container"]').find('option').should('have.length',4);
        });
    });


    context('locked out user login',()=>{

        beforeEach('Get to the login page with a locked out user account', () =>{
            cy.loginAs('locked_out_user','secret_sauce');
        });

        it('locked out user Page',()=>{
            
            cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
            cy.get('[data-test="username"]').should('be.visible').and('have.value','locked_out_user');
            cy.get('[data-test="password"]').should('be.visible').and('have.value','secret_sauce');
            cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
            cy.get('[data-test="login-credentials"]').should('exist');
            cy.get('[data-test="login-password"]').should('exist');
        });
    });
});