// IMPORTS ----------------------------------------
import { renderListWithTemplate } from "./utils.mjs";

// The purpose of this script is to generate a list of product cards in HTML from an array
function productCardTemplate(product) {
  let isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      ${isDiscounted ? `<div class="discounted">discounted</div>` : ``}
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      ${isDiscounted ? `<p class="reg-price"><s>$${product.SuggestedRetailPrice.toFixed(2)}</s></p>` : ``}
      <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
    </a>
  </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.length = 0;
  }
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    // For the breadcrumb
    console.log(list.length);
    this.length = list.length;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
