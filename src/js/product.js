import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // get the current cart contents
  let cartItems = getLocalStorage("so-cart");

  // If cartItems is not an array, initialize it as an empty array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // add the new product to the cart
  cartItems.push(product);
  
  // save the cart into LocalStorage
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
