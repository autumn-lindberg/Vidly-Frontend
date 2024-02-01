import httpService from "./httpservice";

export async function getGenres() {
  try {
    return httpService.get(`${localStorage.getItem("API_URL")}/genres`);
  } catch (exception) {
    console.log(exception);
  }
}

export async function getGenre(genreId) {
  try {
    return httpService.get(
      `${localStorage.getItem("API_URL")}/genres/${genreId}`
    );
  } catch (exception) {
    console.log(exception);
  }
}

export async function saveGenre(genre) {
  try {
    return httpService.post(`${localStorage.getItem("API_URL")}/genres`, genre);
  } catch (exception) {
    console.log(exception);
  }
}

export function updateGenre(genre) {
  try {
    return httpService.put(
      `${localStorage.getItem("API_URL")}/genres/${genre._id}`,
      genre
    );
  } catch (exception) {
    console.log(exception);
  }
}

export function deleteGenre(genre) {
  try {
    return httpService.delete(
      `${localStorage.getItem("API_URL")}/genres/${genre._id}`
    );
  } catch (exception) {
    console.log(exception);
  }
}
