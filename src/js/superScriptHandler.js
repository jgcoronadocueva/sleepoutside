// This script checks the amount of elements in the local storage and feed the .total-amount with the length of elements in the storage

import { getLocalStorage } from "./utils.mjs";

export default function amountChangeHandler() {
  let storageArray = getLocalStorage("so-cart") || [];
  let superScript = document.querySelector(".total-amount");
  superScript.innerHTML = `${storageArray.length}`;
}

amountChangeHandler();
