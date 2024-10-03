import { getLocalStorage, elementExists, showHiddenElement } from "./utils.mjs";
import amountChangeHandler from "./superScriptHandler";
import {loadHeaderFooter} from "./utils.mjs";



function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

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
loadHeaderFooter()
// Render the cart contents
renderCartContents();

// Check the items' amount inside the cart
//amountChangeHandler();

// Calculate the total price
totalCalculator();
