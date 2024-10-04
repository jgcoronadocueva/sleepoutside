import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParams } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Renders header and footer
loadHeaderFooter();

const productId = getParams("product");
const dataSource = new ProductData();

const product = new ProductDetails(productId, dataSource);
product.init();
