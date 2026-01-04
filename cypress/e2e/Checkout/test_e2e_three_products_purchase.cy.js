/// <reference types="cypress" />

/** @type {import('../../fixtures/users_credentials.json').users_credentials} */
/** @type {import('../../fixtures/products.json').products} */
/** @type {import('../../fixtures/cart_data.json').cart_data} */
/** @type {import('../../fixtures/checkout_data.json').checkout_data} */
/** @type {import('../../fixtures/customer_details.json').customer} */
/** @type {import('../../support/pages/CheckoutPage').CheckoutPage} */
/** @type {import('../../support/pages/CartPage').CartPage} */


import checkoutPage from "../../support/pages/CheckoutPage"
import cartPage from "../../support/pages/CartPage";
import users from '../../fixtures/users_credentials.json';
import cart_data from '../../fixtures/cart_data.json';
import checkout_data from '../../fixtures/checkout_data.json';
import customer from '../../fixtures/customer_details.json';

/**
 * Test Suite: End-to-End (E2E) Standard User Purchase Journey
 * Target: https://www.saucedemo.com (Inventory & Checkout)
 * * Objectives:
 * - Authenticate using standard user credentials.
 * - Complete a full transactional flow from products selection to final checkout.
 * - Validate order confirmation success.
 */


describe('Test Suite: End-to-End (E2E) Standard User Purchase Journey', () => {

    context('Standard user want to place an order for 3 products, proceed to checkout and vakidate the success of the transaction',()=>{
          

          it('Standard User Purchase Journey and order confirmation success.',()=>{

                // Standard user logged in, add 3 to his cart and move to the cart page
                cy.loginAndPrepareCart(users.standardUser,cart_data.products_indexes);

                // Click on the checkout button
                cartPage.btnCheckout.click();

                // Fill in the customer details 
                checkoutPage.firstName.should('have.value','').type(customer.firstName);
                checkoutPage.lastName.should('have.value','').type(customer.lastName);
                checkoutPage.postalCode.should('have.value','').type(customer.postalCode);

                // Proceed with the check Out to review the order details
                checkoutPage.btnContinue.click();

                // After reviewing the order details, click on the button Finish
                checkoutPage.btnFinish.click();

               // Validation of the transaction status
               checkoutPage.confirmationOfTransaction.should('have.text',checkout_data.messages[0].checkout_success)
          })
    })
})