import { loadHeaderFooter, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter();

// Display products on product listing page based off which url category is passed.
const category = getParams("category");
let tentDataSource = new ProductData();
const htmlTag = document.querySelector(".product-list");
let tentListing = new ProductListing(category, tentDataSource, htmlTag);
tentListing.init();
