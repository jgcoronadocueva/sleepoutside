import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import amountChangeHandler from "./superScriptHandler";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Find product using its ID
    this.product = await this.dataSource.findProductById(this.productId);

    // Render
    this.renderProductDetails(".divider");

    // add listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", () => {
      this.addProductToCart(this.product);
    });
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  addProductToCart(product) {
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
    // control the super suscript
    amountChangeHandler();
  }

  renderProductDetails(selector) {
    const main = document.querySelector(selector);
    main.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));
  }
}

// Product Page Template

function productDetailsTemplate(product) {
  return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}
