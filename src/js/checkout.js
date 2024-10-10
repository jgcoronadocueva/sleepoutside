import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Renders header and footer
loadHeaderFooter();

let myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// Show Totals after zip code
document
  .querySelector("#zip")
  .addEventListener("blur", myCheckout.calculateOrdertotal.bind(myCheckout));