export class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.checkOutList = 'h4 a';
      this.checkoutPriceList = 'tr td:nth-child(4) strong';
      this.sumTotal = 'h3 > strong';
      this.checkoutButton = page.getByText('Checkout');
    }
    async getCheckOutlist() 
        {
            return this.checkOutList;
        }
    async getPrices() 
        {
          return this.checkoutPriceList;
        }
     async getTotal() 
        {
          return this.sumTotal;
        }
      async checkOutClick()
        {
          await this.checkoutButton.click(); 
        }
        


  }
  
