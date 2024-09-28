import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

//Pulls data from tents json file, selects location where template will be applied,
// and renders a product card for each product in the tents category.
let currentDataSource = new ProductData("tents");
const proudctCardElement = document.querySelector(".product-list");
let productList = new ProductListing(
  "tents",
  currentDataSource,
  proudctCardElement,
);
productList.init();
