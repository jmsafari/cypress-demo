class CartPage{

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

    get productListing(){
        return cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]'); 
    }

    get cartLink(){
        return cy.get('[data-test="shopping-cart-link"]'); 
    }

    get cartBadge(){
        return cy.get('[data-test="shopping-cart-badge"]'); 
    }

    get cartBadge(){
        return cy.get('[data-test="shopping-cart-badge"]'); 
    }

    get btnContinueShopping(){
        return cy.get('[data-test="continue-shopping"]'); 
    }

    get btnCheckout(){
        return cy.get('[data-test="checkout"]'); 
    }

    get copyRight(){
        return cy.get('[data-test="footer-copy"]'); 
    }

     linkToSocialMedia(social_media){
        return cy.get(`[data-test="social-${social_media}"]`); 
    }
    
}

export default new CartPage();