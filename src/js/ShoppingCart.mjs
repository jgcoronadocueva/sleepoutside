import { getLocalStorage } from "./utils.mjs";
//updated template to include the quantity value of item, instead of a static 1
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${(item.FinalPrice * item.quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(parentSelector) {
    this.parentSelector = parentSelector;
  }
  renderCartContents() {
    const cartItems = getLocalStorage("so-cart");
    if (cartItems) { // "if" added to prevent the site from getting an error when the cart is empty
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
  }
  
}