import httpService from "./httpservice";
import config from "../config.json";

export async function getCustomers() {
  try {
    return httpService.get(`${config.apiEndpoint}/customers`);
  } catch (exception) {
    console.log(exception);
  }
}
