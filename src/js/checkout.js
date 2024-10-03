import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

//returns templates to index.html for main page
loadHeaderFooter();

let cartContents = new ShoppingCart(".shopping-list");
cartContents.renderCartContents();
