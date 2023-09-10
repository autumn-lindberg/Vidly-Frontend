// function to return only movies of a specified genre

export function generateGenre(allMovies, currentGenre) {
  if (currentGenre === "All Movies") {
    return allMovies;
  } else {
    // array filter takes in a boolean function as a parameter
    // boolean function is the grounds on whether to include/exlude from new array
    return allMovies.filter((movie) => movie.genre.name === currentGenre);
  }
}
