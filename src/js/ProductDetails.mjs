import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";
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
    this.renderProductDetails("main.divider");

    // add listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", () => {
      this.addProductToCart(this.product);
    });
  }

  addProductToCart(product) {
    // get the current cart contents
    let cartItems = getLocalStorage("so-cart");
    let duplicate = false;

    // If cartItems is not an array, initialize it as an empty array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    //Checks cart for duplicate items using Id
    for (const p of cartItems) {
      if (p.Id === product.Id) {
        // If duplicate, increases quantity value
        p.quantity++;
        duplicate = true;
        break;
      }
    }
    // If not a duplicate, initializes quantity value in item and adds to cart array
    if (!duplicate) {
      product.quantity = 1;
      cartItems.push(product);
    }
    // save the cart into LocalStorage
    setLocalStorage("so-cart", cartItems);
    
    // show alert
    alertMessage("Product added to the cart.", ".product-detail", false, 2000);

    // control the superscript number
    amountChangeHandler();
  }

  renderProductDetails(selector) {
    //Products
    const main = document.querySelector(selector);
    main.insertAdjacentHTML("afterBegin", productDetailsTemplate(this.product));

    //Breadcrumb
    const section = document.createElement("section");
    section.classList.add("products");
    section.classList.add("title");

    const h2 = document.createElement("h2");
    h2.innerHTML = this.product.Category.replace(/-/g, " ").replace(/s\b/, "");
    section.prepend(h2);
    main.prepend(section);
  }
}

// Product Page Template

function productDetailsTemplate(product) {
  let isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  return `<section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      ${isDiscounted ? `<div class="discounted">discounted</div>` : ``}
      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      ${isDiscounted ? `<p class="reg-price"><s>$${product.SuggestedRetailPrice.toFixed(2)}</s></p>` : ``}
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>

      <p class="product__color">${product.Colors[0].ColorName}</p>

      <p class="product__description">${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}
