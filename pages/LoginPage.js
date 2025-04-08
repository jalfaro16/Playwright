export class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = '#username';
      this.passwordInput = '#password';
      this.checkBox = "//div[@class='form-group'][5]/label/span/input"
      this.loginButton = '#signInBtn';
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.checkBox);
      await this.page.click(this.loginButton);

    }

    

  }
  
