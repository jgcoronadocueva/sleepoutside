// IMPORTS ----------------------------------------
import { renderListWithTemplate } from "./utils.mjs";

// The purpose of this script is to generate a list of product cards in HTML from an array
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(this.filterList(list));
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  // created this method that filters the tents that are not supposed to be displayed.

  filterList(list) {
    let newArray = list.filter(({ Id }) => {
      let result = Id !== "989CG" && Id !== "880RT";
      return result;
    });

    return newArray;
  }
}
