import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, calculateTotal } from "./utils.mjs";

const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simpleItems = items.map((item) => {
    return {
      id: item.id,
      price: item.FinalPrice,
      name: item.name,
      quantity: item.quantity,
    };
  })
  console.log(simpleItems);
  return simpleItems;
 
}


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

  async checkout(form){
    const formInfo = document.forms["checkout"];
    const json = formDataToJSON(formInfo);

    json.orderDate = new Date();
    json.orderTotal = this.orderTotal
    json.shipping = this.shippingCost
    json.tax = this.tax
    json.items = packageItems(this.cartList);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err){
      console.log(err);
    }

  }
}
