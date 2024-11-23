const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

searchButton.addEventListener("click", () => {
  const APIkey = "b9b2da42223b1a95485cb8e545386884";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
      } else {
        updateWeatherInfo(city, json);
      }
    });
});

function updateWeatherInfo(city, weatherData) {
  if (cityHide.textContent !== city) {
    cityHide.textContent = city;

    container.style.height = "555px";
    container.classList.add("active");
    weatherBox.classList.add("active");
    weatherDetails.classList.add("active");
    error404.classList.remove("active");

    const image = document.querySelector(".weather-box img");
    const temperature = document.querySelector(".weather-box .temperature");
    const description = document.querySelector(".weather-box .description");
    const humidity = document.querySelector(".weather-details .humidity span");
    const windSpeed = document.querySelector(".weather-details .wind span");

    switch (weatherData.weather[0].main) {
      case "Clear":
        image.src = "images/clear.png";
        break;
      case "Rain":
        image.src = "images/rain.png";
        break;
      case "Snow":
        image.src = "images/snow.png";
        break;
      case "Clouds":
        image.src = "images/cloud.png";
        break;
      case "Mist":
      case "Haze":
        image.src = "images/mist.png";
        break;
    }

    temperature.innerHTML = `${parseInt(weatherData.main.temp)}<span>℃</span>`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}km/h`;
  }
}
