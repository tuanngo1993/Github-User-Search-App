export function NoResults(error) {
  let noResults = document.querySelector(".no-results");
  if (!error) {
    noResults.classList.add("hidden");
  } else {
    noResults.classList.remove("hidden");
  }
}
