import httpService from "./httpservice";
import config from "../config.json";

export function getMovies() {
  try {
    return httpService.get(`${config.apiEndpoint}/movies`);
  } catch (exception) {
    console.log(exception);
  }
}
