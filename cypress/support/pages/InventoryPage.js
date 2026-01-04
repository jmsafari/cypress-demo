class InventoryPage{

    get title(){
        return cy.get('[data-test="title"]'); 
    } 

    get logo(){
        return cy.get('.app_logo'); 
    } 

    get burgerMenu(){
        return cy.get('#react-burger-menu-btn'); 
    } 

    get burgerMenuItems(){
        return cy.get('.bm-item-list').find('.bm-item');
    }

    get productsSortingOptions(){
        return cy.get('[data-test="product-sort-container"]').find('option'); 
    }

    get productListing(){
        return cy.get('[data-test="inventory-list"]').find('[data-test="inventory-item"]'); 
    }

    get cartLink(){
        return cy.get('[data-test="shopping-cart-link"]'); 
    }

    get cartBadge(){
        return cy.get('[data-test="shopping-cart-badge"]'); 
    }

    get copyRight(){
        return cy.get('[data-test="footer-copy"]'); 
    }
    
    linkToSocialMedia(social_media){
        return cy.get(`[data-test="social-${social_media}"]`); 
    }

    addItemToCart(itemToPurchase){
        cy.get(`[data-test="add-to-cart-${itemToPurchase}"]`).click(); 
    }

    removeItemToCart(itemToPurchase){
        cy.get(`[data-test="remove-${itemToPurchase}"]`).click();
    }
}

export default new InventoryPage();