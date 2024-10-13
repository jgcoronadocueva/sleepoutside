// Imports
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

// Renders header and footer
loadHeaderFooter();

async function listing() {
  // Display products
  const category = getParams("category");
  let dataSource = new ExternalServices();
  const htmlTag = document.querySelector(".product-list");
  let productListing = new ProductListing(category, dataSource, htmlTag);
  await productListing.init();

  // Breadcrumb
  const title = document.querySelector("span.title");
  let formattedCategory = category.replace(/-/g, " ");
  let number = productListing.length;
  title.innerHTML = `${formattedCategory} >> (${number} items)`;
}

listing();
