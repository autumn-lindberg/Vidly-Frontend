import httpService from "./httpservice";
import config from "../config.json";

export function getMovies() {
  try {
    return httpService.get(`${config.apiEndpoint}/movies`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getMovie(movieId) {
  try {
    return httpService.get(`${config.apiEndpoint}/movies/${movieId}`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveMovie(movie) {
  try {
    return httpService.post(`${config.apiEndpoint}/movies`, movie);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateMovie(movie) {
  try {
    return httpService.put(`${config.apiEndpoint}/movies/${movie._id}`, movie);
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteMovie(movie) {
  try {
    return httpService.delete(`${config.apiEndpoint}/movies/${movie._id}`);
  } catch (exception) {
    console.log(exception);
  }
}
