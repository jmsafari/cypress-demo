/// <reference types="cypress" />

/** @type {import('../../fixtures/users_credentials.json').users_credentials} */
/** @type {import('../../fixtures/products.json').products} */
/** @type {import('../../fixtures/inventory_data.json').inventory_data} */
/** @type {import('../../support/pages/InventoryPage').InventoryPage} */
/** @type {import('../../support/pages/LoginPage').LoginPage} */
import inventoryPage from "../../support/pages/InventoryPage";
import loginPage from "../../support/pages/LoginPage";
import users from '../../fixtures/users_credentials.json';
import products_list from '../../fixtures/products.json';
import inventory_data from '../../fixtures/inventory_data.json';

/*
 * We are testing the e-commerce test website 'https://www.saucedemo.com'
 *  
 * Test the initial Inventory Page State:
 * - Validate the presence of the page title.
 * - Validate the presence of the page logo.
 * - Validate the options in the menu.
 * - Validate the presence of the social media links.
 * - Validate the presence of the copyright text.
 * - Validate the presence of the Product list.
 * - Validate the presence of the sorting options.
 * - Validate the presence of the "Add-to-cart" buttons.
 * - Validate the presence of the social media links.
 * - Validate the presence of the shopping cart link.
 * - validate that the product details are present.
 */ 

/**
 * Test Suite: Inventory Page UI Check
 * Target: https://www.saucedemo.com/inventory.html
 * * Objectives:
 * - Header: Verify Page Title, Branding Logo, and Shopping Cart accessibility.
 * - Navigation: Validate Sidebar Menu options and Product Sorting functionality.
 * - Inventory: Ensure the Product Grid is populated with valid names, descriptions, 
 * prices, and active "Add-to-Cart" buttons.
 * - Footer: Confirm Social Media links and Copyright legal text are rendered.
 */


describe('Test Suite: Inventory Page UI Check', () => {

    context('Standard user logged in',()=>{
          
          beforeEach(()=>{
             cy.visit("/");
             const user = users.standardUser;
             loginPage.login(user.username,user.password);
             cy.url().should('include',user.redirectTo);
          })

          it('should display Page Title, Branding Logo, copyright and Shopping Cart accessibility',()=>{
            // Validate the title, the logo, the Copyright and cart link
            inventoryPage.title.should('have.text',inventory_data.page.title);
            inventoryPage.logo.should('have.text',inventory_data.page.logo);
            inventoryPage.copyRight.should('contain',inventory_data.page.copyright);
            inventoryPage.cartLink.should('be.visible');
            inventoryPage.cartBadge.should('not.exist');

          })

          it('check the main menu links',()=>{
                const menu_links = inventory_data.main_menu_links;
                inventoryPage.burgerMenu.click();
                inventoryPage.burgerMenuItems.should('have.length',menu_links.length);

                menu_links.forEach((item,i)=>{

                    inventoryPage.burgerMenuItems.eq(i)
                    .should('have.text', item.label);
                })
          })  

          it('check the presence of the social media links',()=>{
                // Validate the presence of the social media links
                inventory_data.social_media.forEach((item)=>{
                    inventoryPage.linkToSocialMedia(item.name).should('have.attr','href',item.url);
                })
          })

          it('should display valid products sorting options',()=>{

                const sorting_options = inventory_data.product_sorting_options;
                inventoryPage.productsSortingOptions.should('have.length',sorting_options.length);
                sorting_options.forEach((item, i)=>{

                        inventoryPage.productsSortingOptions.eq(i)
                            .should('have.attr','value',item.value)
                            .and('have.text',item.label);
                })
          }) 

          it('should ensure the Product Grid is populated with valid names, prices, and active "Add-to-Cart" buttons.', ()=>{

               const products = products_list.items;
               inventoryPage.productListing.each((item,i)=>{

                        cy.wrap(item).within(()=>{
                            cy.get('img.inventory_item_img').should('be.visible');
                            cy.get('[data-test="inventory-item-desc"]').should('be.visible');
                            cy.get('[data-test="inventory-item-name"]').should('have.text', products[i].name);
                            cy.get('[data-test="inventory-item-price"]').should('have.text', products[i].price);
                            cy.get('button.btn_inventory').should('have.text',inventory_data.buttons[0].add_label);
                        })
               })
          })
    })
})