function getForecast(coordinates) {
  let apiKey = "a1217263a189bd405da8136f9b5059c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayCurrentWeather(response) {
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function fetchCurrent(position) {
  let apiKey = "a1217263a189bd405da8136f9b5059c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentWeather);
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
  if (hour > 12) {
    hour = `${hour - 12}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${dayOfWeek} ${hour}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `   
            <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
               <img src="images/${
                 forecastDay.weather[0].icon
               }.png" alt="" id="future-icon" width="60px" />
              <div class="forecast-temperature">
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let fetchCurrentData = document.querySelector("#fetch-location");
fetchCurrentData.addEventListener("click", retrievePosition);

let cityForm = document.querySelector("#citySearched");
cityForm.addEventListener("submit", handleSubmit);

searchCity("New York");
