function handleSearchRequest(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = searchInput.value;
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSearchRequest);
