import httpService from "./httpservice";

export function getMovies() {
  try {
    return httpService.get(`${process.env.REACT_APP_API_ENDPOINT}/movies`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getMovie(movieId) {
  try {
    return httpService.get(
      `${process.env.REACT_APP_API_ENDPOINT}/movies/${movieId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveMovie(movie) {
  try {
    return httpService.post(
      `${process.env.REACT_APP_API_ENDPOINT}/movies`,
      movie
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateMovie(movie) {
  try {
    return httpService.put(
      `${process.env.REACT_APP_API_ENDPOINT}/movies/${movie._id}`,
      movie
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteMovie(movie) {
  try {
    return httpService.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/movies/${movie._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
