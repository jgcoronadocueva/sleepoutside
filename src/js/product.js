import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

//returns templates to index.html for main page
loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();
