import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

//returns templates to index.html for main page
loadHeaderFooter();

//the instructors solution didn't inlcude the actual rendering of the checkout page, 
//so It's hard to say what it should look like. For now, 
//it's basically a copy and paste of the cart page.
let cartContents = new ShoppingCart(".shopping-list");
cartContents.renderCartContents();


