export class LandingPage {
    constructor(page) {
      this.page = page;
      this.pList='app-card';
      this.pTitle='.card-title a';
      this.addButton = '.card-footer button';
      this.checkoutButton = 'text=Checkout';
      //this.pLocator = this.page.locator('app-card');
    }
  
    async getProductsListL() 
        {
            return this.page.locator(this.pList);
        }


    
    async getProductsList() 
        {
            return this.pList;
        }
    async getProductTitle() 
        {
            return this.pTitle;
        }

    async getAddButton() 
        {
          return this.addButton;
        }

    async checkOutClick() 
        {
          await this.page.click(this.checkoutButton);
        }


  }
  
