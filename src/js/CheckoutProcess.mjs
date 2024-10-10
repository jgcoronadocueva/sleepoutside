import { getLocalStorage, calculateTotal } from "./utils.mjs";

export default class CheckoutProcess {
  constructor() {
    this.subTotal;
    this.cartList;
    this.shippingCost;
    this.tax;
    this.orderTotal;
  }
  async init() {
    this.cartList = await getLocalStorage("so-cart");
    this.subTotal = calculateTotal(this.cartList);
    this.calculateOrderTotal();
    this.displaySummary();
  }

  calculateShippingTotal() {
    let totalItems = 0;
    this.cartList.forEach((item) => {
      totalItems += item.quantity;
    });
    console.log(totalItems);
    return 10 + (totalItems - 1) * 2;
  }

  calculateTax() {
    var tax = this.subTotal *.06;
    return Math.round(tax * 100) /100;
  }

  calculateOrderTotal() {
    this.tax = this.calculateTax();
    this.shippingCost = this.calculateShippingTotal();
    this.orderTotal = this.tax + this.shippingCost + this.subTotal;
  }

  displaySummary() {
    let html = `<h3>Order Summary</h3>
          <p>Subtotal: <span id="subtotal">${new Intl.NumberFormat("en-US").format(this.subTotal)}</span></p>
          <p>Shipping Estimate: <span id="shippingEstimate">${this.shippingCost}</span></p>
          <p>Tax: <span id="tax">${this.tax}</span></p>
          <p>
            <strong>Order Total: <span id="orderTotal">${new Intl.NumberFormat("en-US").format(this.orderTotal)}</span></strong>
          </p>`;

    if (this.cartList) {
      // "if" added to prevent the site from getting an error when the cart is empty

      document.querySelector(".order-summary").innerHTML = html;
    }else{
      console.log("failure")
    }
  }
}
