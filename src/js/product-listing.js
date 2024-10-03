// Imports
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Renders header and footer
loadHeaderFooter();

// Display tents
let tentDataSource = new ProductData("tents");
const htmlTag = document.querySelector(".product-list");
let tentListing = new ProductListing("tents", tentDataSource, htmlTag);
tentListing.init();