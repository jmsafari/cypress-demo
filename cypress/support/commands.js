// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import products_list from "../fixtures/products.json";

Cypress.Commands.add('loginAndPrepareCart', (user, productsOrderedIndexes) => {
    
        cy.visit('/');
        cy.get('[data-test="username"]').type(user.username);
        cy.get('[data-test="password"]').type(user.password);
        cy.get('[data-test="login-button"]').click();

        productsOrderedIndexes.forEach((index) => {
            cy.get(`[data-test="add-to-cart-${products_list.items[index].ref}"]`).click();
        });

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', productsOrderedIndexes.length.toString());

        cy.get('[data-test="shopping-cart-link"]').click();
});
