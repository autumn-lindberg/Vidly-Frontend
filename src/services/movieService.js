import httpService from "./httpservice";

export function getMovies() {
  try {
    return httpService.get(`${localStorage.getItem("API_URL")}/movies`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getMovie(movieId) {
  try {
    return httpService.get(
      `${localStorage.getItem("API_URL")}/movies/${movieId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveMovie(movie) {
  try {
    return httpService.post(`${localStorage.getItem("API_URL")}/movies`, movie);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateMovie(movie) {
  try {
    return httpService.put(
      `${localStorage.getItem("API_URL")}/movies/${movie._id}`,
      movie
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteMovie(movie) {
  try {
    return httpService.delete(
      `${localStorage.getItem("API_URL")}/movies/${movie._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
