import httpService from "./httpservice";
import config from "../config.json";

export async function getProducts() {
  try {
    return httpService.get(`${config.apiEndpoint}/products`);
  } catch (exception) {
    console.log(exception);
  }
}
