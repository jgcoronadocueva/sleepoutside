// Imports
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

// Renders header and footer
loadHeaderFooter();

// Display products
const category = getParams("category");
let dataSource = new ExternalServices();
const htmlTag = document.querySelector(".product-list");
let tentListing = new ProductListing(category, dataSource, htmlTag);
tentListing.init();

// Display correct product title
const title = document.querySelector("span.title");
let formattedCategory = category.replace(/-/g, " ");
title.innerHTML = formattedCategory;
