// Imports
import Alert from "./Alert";
import { loadHeaderFooter } from "./utils.mjs";
import { buildSignUpBox, buildForm, removeForm, submitEmail } from "./newsletter";

// Renders header and footer
loadHeaderFooter();

// Checks to see if there are any alerts, and displays them on the top of the index page.
let alerts = new Alert();
alerts.init();


//Adds a form for the user to signup for a newsletter, displays confirmation on sumbit.
buildSignUpBox();
buildForm(".newsletter");
document.querySelector("#newsSubmit").addEventListener("click", function(event){
    removeForm(".newsletter");
    event.preventDefault();
    //Not sure where to post the data, but here is the function to do so. 
    //The URL was copied from the checkout form, which returns as an error.
    //Function was created in External Services and function was pulled from CheckoutProcess. 
    //submitEmail();
});

