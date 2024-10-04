// Imports
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

// Renders header and footer
loadHeaderFooter();

// Display products
const category = getParams("category");
let dataSource = new ProductData();
const htmlTag = document.querySelector(".product-list");
let tentListing = new ProductListing(category, dataSource, htmlTag);
tentListing.init();

// Display correct product title
const title = document.querySelector("span.title");
let formattedCategory = category
  .replace(/-/g, " ")
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
title.innerHTML = formattedCategory;
