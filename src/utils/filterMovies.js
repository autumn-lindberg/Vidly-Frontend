// function to return only results matching text

export function filterMovies(allResults, currentText) {
  // lowercase search text
  currentText = currentText.toLowerCase();
  // array filter takes in a boolean function as a parameter
  // boolean function is the grounds on whether to include/exlude from new array
  return allResults.filter((result) =>
    result.title.toLowerCase().includes(currentText)
  );
}
