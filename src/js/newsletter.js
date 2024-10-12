import { formDataToJSON } from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";


const services = new ExternalServices();
//Adds a div to the bottom of the home page for the newsletter signup.
export function buildSignUpBox() {
    let box = document.createElement("div");
    box.classList.add("newsletter");
    let mainElement = document.querySelector("main");
    mainElement.appendChild(box);
    }
//Adds the form to the sign up box
export function buildForm(parent) {
    const pElement = document.querySelector(parent);
    let signUpForm = `
    <p>Enter your email to recieve our monthly newsletter!</p>
    <form name="newsForm">
         <label for="email">Email: </label>
         <input name="email" type="email" required>
         <input id="newsSubmit" type="submit" value="Sign Up">
    </form>
    `
     pElement.innerHTML = signUpForm;
    }
//Changes the contents from a form to a simple message
export function removeForm(parent) {
    const pElement = document.querySelector(parent);
    let confirmation = `
    <h3>Success!</h3>
    <p>Thank you for signing up! Check your email for confirmation.</p>`
    pElement.innerHTML = confirmation;
    }
//function for sumbitting the email to an API if needed.
export async function submitEmail(){
    const formElement = document.forms["checkout"];
    const json = formDataToJSON(formElement);

    try {
      const res = await services.newsSignUp(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
}
