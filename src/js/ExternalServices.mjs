import { alertMessage } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const response = await res.json();
  if (res.ok) {
    return response;
  } else {
    const errors = Object.keys(response).map((key) => {
      let text = `${key}: ${response[key]}`;
      alertMessage(text);
      return text;
    });
    throw new Error(errors.join(", "));
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  async findProductById(id) {
    const product = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(product);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}
