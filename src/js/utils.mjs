import amountChangeHandler from "./superScriptHandler";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL Parameters
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

// Total$ in Cart (Trello Card)
// Check if an element with an specific class exists
export function elementExists(element) {
  return document.querySelector(element) !== null;
}

// Remove hide class from an element
export function showHiddenElement(element) {
  return document.querySelector(element).classList.remove("hide");
}

// render a list with template

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map((product) => templateFn(product));
  parentElement.insertAdjacentHTML(position, htmlStrings.join(" "));
}

export function renderWithTemplate(
  template,
  parentElement,
  position = "afterbegin",
) {
  //if(callback) {
  //  callback(data);
  //}
  parentElement.insertAdjacentHTML(position, template);
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

//creates both header and footer templates.
export async function loadHeaderFooter() {
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const headerTemplate = await loadTemplate("../partials/header.html");

  const footerElement = document.querySelector("#footerPartial");
  const headerElement = document.querySelector("#headerPartial");

  renderWithTemplate(footerTemplate, footerElement);
  renderWithTemplate(headerTemplate, headerElement);

  amountChangeHandler();
}

// Alert handler for the checkout
export function alertMessage(message, location, scroll = true, duration) {
  // Create a div for the alert
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // Add event listener to the X
  const target = document.querySelector(location);

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      target.removeChild(this);
    }
  });

  // Show the alert
  if (location == "main") {
    target.prepend(alert);
  }
  else target.append(alert);

  if (scroll) window.scrollTo(0, 0);

  if (duration) {
    setTimeout(function () {
      target.removeChild(alert);
      }, duration);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
