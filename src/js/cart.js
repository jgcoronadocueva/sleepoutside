import { getLocalStorage, elementExists, showHiddenElement } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Total$ in Cart (Trello Card)
// Calculate total from a list of products
function calculateTotal(cartItems) {
  let cartTotal = 0;
  cartItems.forEach((item) => {
    cartTotal += item.FinalPrice;
  });
  return cartTotal;
}

// Update the cart total display
function updateCartTotalDisplay(cartTotal) {
  document.querySelector(".cart-total").innerHTML = `Total: $${cartTotal}`;
}

// Showing the Total in the cart site
async function totalCalculator() {
  if (elementExists(".cart-card.divider")) {
    showHiddenElement(".cart-footer");
    const cartItems = await getLocalStorage("so-cart");
    const cartTotal = calculateTotal(cartItems);
    updateCartTotalDisplay(cartTotal);
  }
}

//loads both header and footer html
loadHeaderFooter();

//gets local storage and applies cart template, adds to the html
let cartContents = new ShoppingCart(".product-list");
cartContents.renderCartContents();

// Calculate the total price
totalCalculator();
