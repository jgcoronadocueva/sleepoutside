// Imports
import Alert from "./Alert";
import { loadHeaderFooter } from "./utils.mjs";

//returns templates to index.html for main page
loadHeaderFooter();

// Checks to see if there are any alerts, and displays them on the top of the index page.
let alerts = new Alert();
alerts.init();
