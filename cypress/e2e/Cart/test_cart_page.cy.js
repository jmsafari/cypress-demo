/// <reference types="cypress" />

/** @type {import('../../fixtures/users_credentials.json').users_credentials} */
/** @type {import('../../fixtures/products.json').products} */
/** @type {import('../../fixtures/cart_data.json').cart_data} */
/** @type {import('../../support/pages/CartPage').CartPage} */
import cartPage from "../../support/pages/CartPage";
import users from '../../fixtures/users_credentials.json';
import products_list from '../../fixtures/products.json';
import cart_data from '../../fixtures/cart_data.json';

/**
 * Test Suite: Cart Page UI Check
 * Target: https://www.saucedemo.com/inventory.html
 * * Objectives:
 * - Header: Verify Page Title, Branding Logo, and Shopping Cart accessibility.
 * - Navigation: Validate Sidebar Menu options and Product Sorting functionality.
 * - Cart: Ensure the Product Grid is populated with valid names, descriptions, 
 * prices, and active "Add-to-Cart" buttons.
 * - Footer: Confirm Social Media links and Copyright legal text are rendered.
 */


describe('Test Suite: Cart Page UI validation', () => {

    context('Standard user logged in, add 3 to his cart and move to the cart page',()=>{
          
          beforeEach(()=>{
            cy.loginAndPrepareCart(users.standardUser,cart_data.products_indexes);
            cy.url().should('include',cart_data.page.url);

          })

          it('should display Page Title, Branding Logo, copyright and Shopping Cart details visible.',()=>{

            // Validate the title, the logo, the Copyright and cart link
            cartPage.title.should('have.text',cart_data.page.title);
            cartPage.logo.should('have.text',cart_data.page.logo);
            cartPage.copyRight.should('contain',cart_data.page.copyright);
            cartPage.cartLink.should('be.visible');
            cartPage.cartBadge.should('have.text',cart_data.products_indexes.length);

          })

          it('check the main menu links',()=>{

                const menu_links = cart_data.main_menu_links;
                cartPage.burgerMenu.click();
                cartPage.burgerMenuItems.should('have.length',menu_links.length);

                menu_links.forEach((item,i)=>{

                    cartPage.burgerMenuItems.eq(i)
                    .should('have.text', item.label);
                })
          })  

          it('check the presence of the social media links',()=>{

                // Validate the presence of the social media links
                cart_data.social_media.forEach((item)=>{
                    cartPage.linkToSocialMedia(item.name).should('have.attr','href',item.url);
                })
          })

          it('validate button "Continue Shopping"  ',()=>{

                cartPage.btnContinueShopping.should('have.text',cart_data.buttons[0].continue_shopping.label).click();
                cy.url().should('include',cart_data.buttons[0].continue_shopping.redirectTo)     
          })

          it('validate button "Checkout" ',()=>{

                cartPage.btnCheckout.should('have.text',cart_data.buttons[0].checkout.label).click();
                cy.url().should('include',cart_data.buttons[0].checkout.redirectTo)
                
          })

          it('should ensure the cart listing is populated with the right products (valid names, prices and actives "Remove" buttons).', ()=>{

            const products = products_list.items;
            cartPage.productListing.each((item,i)=>{

                        cy.wrap(item).within(()=>{

                            cy.get('[data-test="inventory-item-desc"]').should('be.visible');
                            cy.get('[data-test="inventory-item-name"]').should('have.text', products[cart_data.products_indexes[i]].name);
                            cy.get('[data-test="inventory-item-price"]').should('have.text', products[cart_data.products_indexes[i]].price);
                            cy.get('button.cart_button').should('have.text',cart_data.buttons[0].rm_label);
                        })
               })
          })
    })
})