/// <reference types="cypress" />

/*
 *  HERE DATA ARE SEPARATED FROM THE CODE
 *
 * We would like to make sure the different role below defined on the test e-commerce 
 * website 'https://www.saucedemo.com'
 * 
 * The tests will cover: 
 * 0. check login interface (No login required)   
 * 1. standard user login: (username: 'standard_user' / password: 'secret_sauce')
 * 2. locked_out_user login (username: 'locked_out_user' / password: 'secret_sauce')
 * 3. wrong_credential_user 1 login (username: 'standard_user' / password: 'wrong_password')
 * 4. wrong_credential_user 2 login (username: 'wrong_user' / password: 'secret_sauce')
 * 5. wrong_credential_user 3 login (username: 'wrong_user' / password: 'wrong_password')
 * 
 * NOTE: all the test users password is 'secret_sauce'
 */ 


describe('Login page and User login', () => {

    /* 
     * Data related to the different scenarios
     */

    const loginScenarios =[
        {
            context: 'check login interface',
            description: 'check login interface items',
            role: 'anonymous',
            password: '',
            expectedUrl: '/',
            checkUI: () => {
                    cy.get('.login_logo').should('have.text','Swag Labs');
                    cy.get('[data-test="username"]').should('be.visible').and('have.value','');
                    cy.get('[data-test="password"]').should('be.visible').and('have.value','');
                    cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
            }
        },
        {
            context: 'standard user login',
            description: 'Standard user: successful login',
            role: 'standard_user',
            password: 'secret_sauce',
            expectedUrl: '/inventory.html',
            checkUI: () => {
                    cy.get('.app_logo').should('have.text','Swag Labs');
                    cy.get('[data-test="title"]').should('have.text','Products');
                    cy.get('[data-test="inventory-list"]').find('[data-test="inventory-item"]').should('have.length.gt', 1);
                    cy.get('[data-test="product-sort-container"]').find('option').should('have.length',4);
            }
        },
        {
            context: 'locked out user login',
            description: 'Locked out user: failed login',
            role: 'locked_out_user',
            password: 'secret_sauce',
            expectedUrl: '/',
            checkUI: () => {
                    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
                    cy.get('[data-test="username"]').should('be.visible').and('have.value','locked_out_user');
                    cy.get('[data-test="password"]').should('be.visible').and('have.value','secret_sauce');
                    cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
                    cy.get('[data-test="login-credentials"]').should('exist');
                    cy.get('[data-test="login-password"]').should('exist');
            }
        },
        {
            context: 'wrong_credential_user 1 login',
            description: 'Wrong user 1: failed login',
            role: 'wrong_user',
            password: 'secret_sauce',
            expectedUrl: '/',
            checkUI: () => {
                    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
                    cy.get('[data-test="username"]').should('be.visible').and('have.value','wrong_user');
                    cy.get('[data-test="password"]').should('be.visible').and('have.value','secret_sauce');
                    cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
                    cy.get('[data-test="login-credentials"]').should('exist');
                    cy.get('[data-test="login-password"]').should('exist');
            }
        },
        {
            context: 'wrong_credential_user 2 login',
            description: 'Wrong user 2: failed login',
            role: 'standard_user',
            password: 'wrong_sauce',
            expectedUrl: '/',
            checkUI: () => {
                    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
                    cy.get('[data-test="username"]').should('be.visible').and('have.value','standard_user');
                    cy.get('[data-test="password"]').should('be.visible').and('have.value','wrong_sauce');
                    cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
                    cy.get('[data-test="login-credentials"]').should('exist');
                    cy.get('[data-test="login-password"]').should('exist');
            }
        },
        {
            context: 'wrong_credential_user 3 login',
            description: 'Wrong user 3: failed login',
            role: 'wrong_user',
            password: 'wrong_sauce',
            expectedUrl: '/',
            checkUI: () => {
                    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username and password do not match any user in this service');
                    cy.get('[data-test="username"]').should('be.visible').and('have.value','wrong_user');
                    cy.get('[data-test="password"]').should('be.visible').and('have.value','wrong_sauce');
                    cy.get('[data-test="login-button"]').should('be.visible').and('have.value','Login');
                    cy.get('[data-test="login-credentials"]').should('exist');
                    cy.get('[data-test="login-password"]').should('exist');
            }
        }
    ];


    loginScenarios.forEach((scenario)=>{

        context(scenario.context, ()=>{

                it(scenario.description,()=>{

                    cy.loginAs(scenario.role,scenario.password);
                    scenario.checkUI();
                });
        });
    });

});