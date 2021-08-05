function showCurrentWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#city").innerHTML = response.data.name;
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

function formatDate(date) {
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

let fetchCurrentData = document.querySelector("#fetch-location");
fetchCurrentData.addEventListener("click", retrievePosition);

let dateElement = document.querySelector("#date");
let now = new Date();

dateElement.innerHTML = formatDate(now);

let cityForm = document.querySelector("#citySearched");
cityForm.addEventListener("submit", handleSubmit);

searchCity("New York");
