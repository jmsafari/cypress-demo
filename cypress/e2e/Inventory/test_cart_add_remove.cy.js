/// <reference types="cypress" />

/** @type {import('../../fixtures/users_credentials.json').users_credentials} */
/** @type {import('../../fixtures/products.json').products} */
/** @type {import('../../support/pages/InventoryPage').InventoryPage} */
/** @type {import('../../support/pages/LoginPage').LoginPage} */
import inventoryPage from "../../support/pages/InventoryPage";
import loginPage from "../../support/pages/LoginPage";
import users from '../../fixtures/users_credentials.json';
import products from '../../fixtures/products.json';

/*
 * Test Suite: Standard User cart Management
 * Target: https://www.saucedemo.com
 * * Scope:
 * - Validate standard user can add a product to his cart.
 * - Validate standard user can add a second product to his cart.
 * - Validate standard user can remove the 1st product added to his cart.
 * - Replace the removed product with a new one.
 * 
 *  NOTE: Product quantity modification is currently out of scope due to test site limitations.
 */ 


describe('Inventory Page: Cart Management', () => {

    context('Standard user journey',()=>{
          
          beforeEach(()=>{
             cy.visit("/");
             const user = users.standardUser;
             loginPage.login(user.username,user.password);
             cy.url().should('include',user.redirectTo);
          })

          it('should allow adding, removing, and replacing items in the cart',()=>{
            
            const product_1 = products.items[0].ref;
            const product_2 = products.items[2].ref;
            const product_3 = products.items[5].ref;

            // Add 1st product and verify badge
            inventoryPage.addItemToCart(product_1);
            inventoryPage.pageCartBadge.should('have.text','1')

            // Add 2nd product and verify badge increments
            inventoryPage.addItemToCart(product_2);
            inventoryPage.pageCartBadge.should('have.text','2')

            // Remove the 1st product and verify badge decrements
            inventoryPage.removeItemToCart(product_1);
            inventoryPage.pageCartBadge.should('have.text','1')

            // Replace with a new product and verify badge returns to 2
            inventoryPage.addItemToCart(product_3);
            inventoryPage.pageCartBadge.should('have.text','2')
          })
    })
})