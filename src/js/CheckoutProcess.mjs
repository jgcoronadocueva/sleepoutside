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
    this.cartList = await getLocalStorage("so-cart")
      .then((this.subTotal = calculateTotal(this.cartList)))
      .then(this.calculateOrderTotal())
      .then(this.displaySummary());
  }

  calculateShippingTotal() {
    let totalItems = 0;
    this.cartList.forEach((item) => {
      totalItems += item.quantity;
    });
    return 10 + (totalItems - 1) * 2;
  }

  calculateTax() {
    return this.subTotal * 0.06;
  }

  calculateOrderTotal() {
    this.tax = this.calculateTax();
    this.shippingCost += this.calculateShippingTotal();
    this.orderTotal = this.tax + this.shippingCost + this.subTotal;
  }

  displaySummary() {
    let summaryView = `<h3>Order Summary</h3>
          <p>Subtotal: <span id="subtotal">${this.subTotal}</span></p>
          <p>Shipping Estimate: <span id="shippingEstimate">${this.shippingCost}</span></p>
          <p>Tax: <span id="tax">${this.tax}</span></p>
          <p>
            <strong>Order Total: <span id="orderTotal">${this.orderTotal}</span></strong>
          </p>`;

    if (this.cartItems) {
      // "if" added to prevent the site from getting an error when the cart is empty

      document.querySelector(".order-summary").innerHTML = summaryView;
    }
  }
}
