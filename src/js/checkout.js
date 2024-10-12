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

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let myForm = document.forms["checkout"];
  let validity = myForm.checkValidity();
  myForm.reportValidity();
  if (validity) {
    myCheckout.checkout();
  }
});
