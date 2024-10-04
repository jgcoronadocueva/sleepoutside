// IMPORTS ----------------------------------------
import { renderListWithTemplate } from "./utils.mjs";

// The purpose of this script is to generate a list of product cards in HTML from an array
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
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
  // init also changes the the content of the title to the data category
  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").innerHTML = this.category;
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  
  /*
  Dont currently have a need to use this, but may in the future.
  filters the products that are not supposed to be displayed.
  filterList(list) {
    let newArray = list.filter(({ Id }) => {
      let result = Id !== "989CG" && Id !== "880RT";
      return result;
    });

    return newArray;
  }*/
}
