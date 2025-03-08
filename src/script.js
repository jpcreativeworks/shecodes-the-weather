function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  console.log(response.data.temperature.current);
}

function searchCity(city) {
  // make api call and update interface
  let apiKey = "7fd5430a29oa8949b4d239de06t9a3d4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchRequest(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  searchCity(searchInput.value);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSearchRequest);
