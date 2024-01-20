import httpService from "./httpservice";

export async function getGenres() {
  try {
    return httpService.get(`${process.env.REACT_APP_API_ENDPOINT}/genres`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getGenre(genreId) {
  try {
    return httpService.get(
      `${process.env.REACT_APP_API_ENDPOINT}/genres/${genreId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveGenre(genre) {
  try {
    return httpService.post(
      `${process.env.REACT_APP_API_ENDPOINT}/genres`,
      genre
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function updateGenre(genre) {
  try {
    return httpService.put(
      `${process.env.REACT_APP_API_ENDPOINT}/genres/${genre._id}`,
      genre
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteGenre(genre) {
  try {
    return httpService.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/genres/${genre._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
