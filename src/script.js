function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityName = document.querySelector("#city-name");
  let weatherDescription = document.querySelector("#description");
  let weatherHumidity = document.querySelector("#humidity");
  let weatherWind = document.querySelector("#wind");
  let weatherWindSpeed = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="api weather icon" class="weather-app-icon" />`;
  console.log(response.data);

  cityName.innerHTML = response.data.city;
  weatherWind.innerHTML = Math.round(weatherWindSpeed);
  weatherHumidity.innerHTML = response.data.temperature.humidity;
  weatherDescription.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(temperature);
  // console.log(response.data.temperature.current);
}

function updateTimeAndTheme() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let dayIndex = now.getDay();

  let amPm;
  if (hours >= 12) {
    amPm = "PM";
  } else {
    amPm = "AM";
  }
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours = hours % 12;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[dayIndex];

  let formattedTime = `${day} ${hours}:${minutes} ${amPm}`;

  document.querySelector("#current-time").innerHTML = formattedTime;

  let body = document.querySelector("body");
  let iconElement = document.querySelector("#icon img");
  if (now.getHours() >= 7 && now.getHours() < 18) {
    // Day Mode
    body.classList.remove("night-mode");
    body.classList.add("day-mode");
    iconElement.src =
      "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-day.png";
  } else {
    // Night Mode
    body.classList.remove("day-mode");
    body.classList.add("night-mode");
    iconElement.src =
      "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/few-clouds-night.png";
  }
}

updateTimeAndTheme();
setInterval(updateTimeAndTheme, 60000);

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
