import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
// import { calculateTotal } from "./cart.js";

// Renders header and footer
loadHeaderFooter();

// async function getItems() {
//   const cartItems = await getLocalStorage("so-cart");

//   return cartItems;
// }

//let items = getItems();
//let subtotal = calculateTotal(items);
const checkOut = new CheckoutProcess();
checkOut.init();

document.querySelector("#checkout-submit").addEventListener("click", (e) => {
  e.preventDefault();

  checkOut.checkout();
});
