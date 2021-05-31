function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[dayIndex];

    return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
    document.querySelector("#city-input").innerHTML = response.data.name;

    console.log(response.data);

    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = Math.round(
        response.data.main.temp
    );
    fahrenheitTemperature = response.data.main.temp;

    let humidityElement = document.querySelector("#humidity-input")
    humidityElement.innerHTML =
        response.data.main.humidity;
    let windElement = document.querySelector("#wind-input")
    windElement.innerHTML = Math.round(
        response.data.wind.speed
    );
    let descriptionElement = document.querySelector("#weather-description")
    descriptionElement.innerHTML =
        response.data.weather[0].description;
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)

}

function searchCity(city) {
    let apiKey = "3a8d7f059fc61ac00591426445cb607a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=6&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
    debugger;
    event.preventDefault();
    let city = document.querySelector("#search-text-input").value;
    searchCity(city);
}

function searchLocation(position) {
    let apiKey = "3a8d7f059fc61ac00591426445cb607a";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#timeOfDay");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemp");
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");

}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#c-link");
celsiusLink.addEventListener("click", displayCelsiusTemp)

let fahrenheitLink = document.querySelector("#f-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp)


searchCity("Portland");


document.getElementById('stylesheet').href = 'src/style.css';
