import { renderListWithTemplate } from "./utils.mjs";
//Template for index.html product cards
function productCardTemplate(product){
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
          </li>`
}
//Class that holds data for a categories json file and renders a template using it's contents to the listed Element.
export default class ProductListing{
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();
        this.renderlist(this.filterTents(list))
    }

    //Calls a reusable function in utils.mjs that renders a template
    renderlist(list){
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    // Checks list for tents that we won't be using on our site by their ID tag
    filterTents(list){
        var filteredList = list.filter(n => n.Id !== "989CG" && n.Id !== "880RT");
        return filteredList
    }
    
}

