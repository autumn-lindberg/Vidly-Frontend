import httpService from "./httpservice";
import config from "../config.json";

export async function getRentals() {
  try {
    return httpService.get(`${config.apiEndpoint}/rentals`);
  } catch (exception) {
    console.log(exception);
  }
}
