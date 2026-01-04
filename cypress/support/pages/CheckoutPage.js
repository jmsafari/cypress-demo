class CheckoutPage{

    get firstName(){
        return cy.get('[data-test="firstName"]'); 
    } 

    get lastName(){
        return cy.get('[data-test="lastName"]'); 
    } 

    get postalCode(){
        return cy.get('[data-test="postalCode"]'); 
    } 

    get confirmationOfTransaction(){
        return cy.get('[data-test="complete-header"]'); 
    } 

    get btnContinue(){
        return cy.get('[data-test="continue"]'); 
    } 

    get btnFinish(){
        return cy.get('[data-test="finish"]'); 
    }
}

export default new CheckoutPage();