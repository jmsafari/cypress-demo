/// <reference types="cypress" />

/*
 *  HERE DATA ARE INSERTED INTO THE CODE
 *
 * We would like to make sure the different role below defined on the test e-commerce 
 * website 'https://www.saucedemo.com'
 * 
 * The tests will cover: 
 * 0. check login interface (No login required)   
 * 1. standard user login: (username: 'standard_user' / password: 'secret_sauce')
 * 2. locked_out_user login (username: 'locked_out_user' / password: 'secret_sauce')
 * 
 * NOTE: all the test users password is 'secret_sauce'
 */ 


describe('Test login page and user logins', () => {

    /*  Anonymous users on the test website 'https://www.saucedemo.com' only access
     *  Home Page which is also the Login page
     *
     *  Test "login page" interface
     */
     
    context('check login interface',()=>{

        beforeEach('Get to the Home Page', () =>{
            cy.visit('/');          // baseUrl = https://www.saucedemo.com
        });

        it('check login page interface items as anonymous user',()=>{

            cy.get('.login_logo').should('have.text','Swag Labs');
            cy.get('[data-test="username"]').should('be.visible').and('have.value','');
            cy.get('[data-test="password"]').should('be.visible').and('have.value','');
            cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
        });
    });

    /*
     *  Test "Standard user": successful login
     */

    context('Standard user login',()=>{ 

        beforeEach('Get to the Home Page then login', () =>{
            cy.loginAs('standard_user','secret_sauce');
        });

        it('Standard user: successful login',()=>{
            
            cy.get('.app_logo').should('have.text','Swag Labs');
            cy.get('[data-test="title"]').should('have.text','Products');
            cy.get('[data-test="inventory-list"]').find('[data-test="inventory-item"]').should('have.length.gt', 1);
            cy.get('[data-test="product-sort-container"]').find('option').should('have.length',4);
        });
    });

    /*
     *  Test "Locked out user": Failed login
     */

    context('locked out user login',()=>{

        beforeEach('Get to the login page with a locked out user account', () =>{
            cy.loginAs('locked_out_user','secret_sauce');
        });

        it('locked out user: failed login',()=>{
            
            cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
            cy.get('[data-test="username"]').should('be.visible').and('have.value','locked_out_user');
            cy.get('[data-test="password"]').should('be.visible').and('have.value','secret_sauce');
            cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
            cy.get('[data-test="login-credentials"]').should('exist');
            cy.get('[data-test="login-password"]').should('exist');
        });
    });
});