import httpService from "./httpservice";
import config from "../config.json";

export async function getGenres() {
  try {
    return httpService.get(`${config.apiEndpoint}/genres`);
  } catch (exception) {
    console.log(exception);
  }
}
