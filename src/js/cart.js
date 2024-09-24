import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}
function isCartEmpty() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart === null || cart.length === 0;
}
if (!isCartEmpty()) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.forEach((item) => {
    const cartCard = document.createElement('li');
    cartCard.className = 'cart-card divider';

    // create the cart card elements (image, name, color, quantity, price)
    // append the cart card to the cartList

    cartList.appendChild(cartCard);
  });
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

renderCartContents();
