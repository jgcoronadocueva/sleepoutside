import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.subTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      console.log(this.list);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
        this.list.forEach(item => {
            this.itemTotal += item.quantity;
            this.subTotal +=  item.FinalPrice;
        });

        let displayAmount = document.querySelector(this.outputSelector + " #num-items");
        displayAmount.innerHTML = this.itemTotal;

        let displaySubTotal = document.querySelector(this.outputSelector + " #cartTotal");
        displaySubTotal.innerHTML = `$${this.subTotal.toFixed(2)}`;
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them along with the cart total to figure out the order total
        this.shipping = 10 + (this.itemTotal - 1) * 2;
        this.tax = this.subTotal * 0.06;
        this.orderTotal = this.subTotal + this.shipping + this.tax;
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      let displayShipping = document.querySelector(this.outputSelector + " #shipping");
      displayShipping.innerHTML = `$${this.shipping.toFixed(2)}`;

      let displayTax = document.querySelector(this.outputSelector + " #tax");
      displayTax.innerHTML = `$${this.tax.toFixed(2)}`;

      let displayTotal = document.querySelector(this.outputSelector + " #orderTotal");
      displayTotal.innerHTML = `$${this.orderTotal.toFixed(2)}`;
    }
  }