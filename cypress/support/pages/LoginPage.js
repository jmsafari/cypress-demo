class LoginPage{

    get loginPageLogo(){
        return cy.get('.login_logo'); 
    } 
    get usernameInput(){
        return cy.get('[data-test="username"]'); 
    } 
    get passwordInput(){
        return cy.get('[data-test="password"]'); 
    } 
    get loginButton(){
        return cy.get('[data-test="login-button"]'); 
    } 
    get loginErrorMessage(){
        return cy.get('[data-test="error"]'); 
    }

    login(username, password){
        if(username != ''){
            this.usernameInput.type(username);
        }
        if(password != ''){
            this.passwordInput.type(password);
        }
        this.loginButton.click();
    }

    isThereLogo(logoText){
        this.loginPageLogo.should('have.text',logoText);
    }

    isUsernameFieldEmpty(){
        this.usernameInput.should('have.value','');
    }

    isPasswordFieldEmpty(){
        this.passwordInput.should('have.value','');
    }

    isPasswordFieldEnabled(){
        this.usernameInput.should('be.enabled');
    }

    typeUsername(username){
        this.usernameInput.type(username);
    }

    typePassword(password){
        this.passwordInput.type(password);
    }

    isUsernameFieldEmpty(){
        this.usernameInput.should('have.text','');
    }

    isUsernameFieldEnabled(){
        this.usernameInput.should('be.enabled');
    }
    
    checkLoginButtonLabel(buttonLabel){
        this.loginButton.should('have.value', buttonLabel);
    }

    isLoginButtonEnabled(){
        this.loginButton.should('be.enabled');
    }
}



export default new LoginPage();