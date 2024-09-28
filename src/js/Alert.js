function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
// template for an alert with a background and font color.
function alertTemplate(alert) {
  return `<p style="background-color:${alert.background};color:${alert.color}">${alert.message}</p>`;
}

//Class pulls data from alert.json, creates a new section element, and renders an alert at the
// top of the index.html page using a template.
export default class Alert {
  constructor() {
    this.path = `../json/alerts.json`;
  }
  async init() {
    const list = await this.getData();
    this.renderAlert(list);
  }
  //grabs data from a json file
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }

  //checks to see if the json is empty, if not creates a new element,
  //iterates through the json data, and appends alerts to that new element using a template function
  renderAlert(list) {
    if (Object.keys(list).length !== 0) {
      const alertSection = document.createElement("section");
      alertSection.classList.add("alert-list");
      const main = document.querySelector("main");
      main.prepend(alertSection);

      const htmlStrings = list.map(alertTemplate);
      alertSection.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    }
  }
}
