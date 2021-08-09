function getForecast(coordinates) {
  let apiKey = "a1217263a189bd405da8136f9b5059c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#current-icon");
  let icon = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "a1217263a189bd405da8136f9b5059c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function fetchCurrent(position) {
  let apiKey = "a1217263a189bd405da8136f9b5059c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function retrievePosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(fetchCurrent);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let DaysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = DaysOfWeek[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${dayOfWeek} ${hour}:${minutes}`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `   
            <div class="col-2">
              <div class="forecast-date">${day}</div>
              <div class="icon-cloud">
                <img src="images/cloud.png" alt="cloud" width="60px" />
              </div>
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">62°</span>
                <span class="forecast-temperature-min">50°</span>
              </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fetchCurrentData = document.querySelector("#fetch-location");
fetchCurrentData.addEventListener("click", retrievePosition);

let cityForm = document.querySelector("#citySearched");
cityForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("New York");
