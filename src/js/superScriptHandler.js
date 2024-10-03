// This script checks the amount of elements in the local storage and feed the .total-amount with the length of elements in the storage

import { getLocalStorage } from "./utils.mjs";

export default function amountChangeHandler() {
  let storageArray = getLocalStorage("so-cart") || [];

  if (storageArray.length > 0) {
    let amountContainer = document.querySelector(".amount-container");
    amountContainer.style.display = "flex";
  }

  let superScript = document.querySelector(".total-amount");
  superScript.innerHTML = `${storageArray.length}`;
}
