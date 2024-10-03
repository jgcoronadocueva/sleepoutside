// Imports
import Alert from "./Alert";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

//returns templates to index.html for main page
loadHeaderFooter();

// Display tents on main site
let tentDataSource = new ProductData("tents");
const htmlTag = document.querySelector(".product-list");
let tentListing = new ProductListing("tents", tentDataSource, htmlTag);
tentListing.init();

// Checks to see if there are any alerts, and displays them on the top of the index page.
let alerts = new Alert();
alerts.init();
