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

function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun",
        "Mon",
        "Tues",
        "Wed",
        "Thurs",
        "Fri",
        "Sat"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#weatherForecast");
    let forecastHTML = `<div class="row">`
    forecast.forEach(function (forecastDay, index) {
        if (index < 5) {
            forecastHTML =
                forecastHTML + `
        <div class="col-2">
        <div class="weather-forecast-date">${formatDate(forecastDay.dt)}</div>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"></i>
        <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
        ${Math.round(forecastDay.temp.max)}°
        </span> / 
        <span class="weather-forecast-temperature-mini">
        ${Math.round(forecastDay.temp.min)}°
        </span>
        </div>
        </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "3a8d7f059fc61ac00591426445cb607a";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayForecast);
}


function displayWeatherCondition(response) {
    document.querySelector("#city-input").innerHTML = response.data.name;

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
    iconElement.setAttribute("alt", response.data.weather[0].description);

    document.getElementById("backgroundPic").style.backgroundImage = changeBackground(response.data.weather[0].id);
    document.getElementById("search-text-input").style.backgroundImage = changeBackground(response.data.weather[0].id);
    mainweather = response.data.weather[0].id;

    getForecast(response.data.coord);
}



function changeBackground(mainWeather) {
    let clearImage = "url('src/images/clear-day.gif')";
    let defaultImage = "url('src/images/mist.gif')";
    let stormImage = "url('src/images/thunderstorm.gif')";
    let drizzleImage = "url('src/images/drizzle.gif')";
    let rainImage = "url('src/images/rain.gif')";
    let snowImage = "url('src/images/snow.gif')";
    let smokeImage = "url('src/images/smoke.gif')";
    let hazeImage = "url('src/images/haze.gif')";
    let sandImage = "url('src/images/sand.gif')";
    let ashImage = "url('src/images/ash.gif')";
    let scatteredImage = "url('src/images/scattered-clouds.gif')";
    let fewImage = "url('src/images/few.gif')";
    let overcastImage = "url('src/images/overcast.gif')";
    let squallImage = "url('src/images/squall.gif')";
    let tornadoImage = "url('src/images/tornado.gif')";
    let dustImage = "url('src/images/dust.gif')";
    if (mainWeather == 800) {
        return clearImage;
    } else if (mainWeather >= 200 && mainWeather <= 232) {
        return stormImage;
    }
    else if (mainWeather >= 300 && mainWeather <= 321) {
        return drizzleImage;
    }
    else if (mainWeather >= 500 && mainWeather <= 531) {
        return rainImage;
    }
    else if (mainWeather >= 600 && mainWeather <= 622) {
        return snowImage;
    }
    else if (mainWeather == 711) {
        return smokeImage;
    }
    else if (mainWeather == 721) {
        return hazeImage;
    }
    else if (mainWeather == 751) {
        return sandImage;
    }
    else if (mainWeather == 751) {
        return ashImage;
    }
    else if (mainWeather == 761) {
        return dustImage;
    }
    else if (mainWeather == 771) {
        return squallImage;
    }
    else if (mainWeather == 781) {
        return tornadoImage;
    }
    else if (mainWeather == 802) {
        return scatteredImage;
    }
    else if (mainWeather == 803) {
        return scatteredImage;
    }
    else if (mainWeather == 801) {
        return fewImage;
    }
    else if (mainWeather == 804) {
        return overcastImage;
    }
    else {
        return defaultImage;
    }
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