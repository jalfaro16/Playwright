export class FinalPage {
    constructor(page) {
        this.page = page;
        this.countryInit = '#country';
        this.suggestionsList = page.locator('.suggestions li'); // Define the locator
        this.checkBox = '#checkbox2';
        this.confirmButton = page.locator('input.btn.btn-success.btn-lg');
        this.successAlert = page.locator('.alert.alert-success.alert-dismissible');
      }

        async selectCountry(countryname,confirmCountry)
        {
        await this.page.type(this.countryInit, countryname);
        await this.suggestionsList.filter({ hasText: confirmCountry }).click();
        }
        async selectCheckBox()
        {
            await this.page.click(this.checkBox, { force: true });
        }
        async confirmPurshase()
        {
            await this.confirmButton.click();
        }
        async getSuccessAlertText() { 
            return await this.successAlert.textContent(); //Return the text content
        }


  }
  
