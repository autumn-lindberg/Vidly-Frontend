// function to return only results matching text

export function filterRentals(allResults, currentText) {
  // lowercase search text
  currentText = currentText.toLowerCase();
  // array filter takes in a boolean function as a parameter
  // boolean function is the grounds on whether to include/exlude from new array
  return allResults.filter(
    (result) =>
      result.movie.title.toLowerCase().includes(currentText) ||
      result.movie.genre.name.toLowerCase().includes(currentText) ||
      result.customer.name.toLowerCase().includes(currentText)
  );
}
