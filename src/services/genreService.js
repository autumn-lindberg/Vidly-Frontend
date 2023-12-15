import httpService from "./httpservice";
import config from "../config.json";

export async function getGenres() {
  try {
    return httpService.get(`${config.apiEndpoint}/genres`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getGenre(genreId) {
  try {
    return httpService.get(`${config.apiEndpoint}/genres/${genreId}`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveGenre(genre) {
  try {
    return httpService.post(`${config.apiEndpoint}/genres`, genre);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateGenre(genre) {
  try {
    return httpService.put(`${config.apiEndpoint}/genres/${genre._id}`, genre);
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteGenre(genre) {
  try {
    return httpService.delete(`${config.apiEndpoint}/genres/${genre._id}`);
  } catch (exception) {
    console.log(exception);
  }
}
