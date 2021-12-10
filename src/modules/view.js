import date from "./date";

const view = (() => {
  function handleDate() {
    const body = document.querySelector("body");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");

    if (date.isItDay()) {
      body.style.backgroundImage = `linear-gradient(
        to right top,
        #0096c7,
        #14a3cf,
        #26b0d6,
        #37bddd,
        #48cae4
      )`;
    } else {
      body.style.backgroundImage = `linear-gradient(
        to right top,
        #000132,
        #001546,
        #00225c,
        #022f72,
        #023e8a
        )`;
    }

    day.textContent = `${date.currentDayName()} ${date.currentDayNumber()}`;
    month.textContent = date.currentMonth();
  }

  function renderResults(weatherData) {
    if (!weatherData) {
      handleErrorMessage("We can't find any data!");
    } else {
      const searchResult = document.querySelector("#search-results");

      const cityName = document.querySelector("#city-name");
      const icon = document.querySelector("#weather-icon");
      const weatherDescription = document.querySelector("#weather-description");
      const feelsLike = document.querySelector("#feels-like");
      const temperature = document.querySelector("#temperature");
      const maxTemperature = document.querySelector("#max-temperature");
      const minTemperature = document.querySelector("#min-temperature");
      const humidity = document.querySelector("#humidity");
      const wind = document.querySelector("#wind");

      cityName.textContent = `${weatherData.cityName}`;
      icon.src = `./images/${weatherData.icon}.png`;
      weatherDescription.textContent = `${weatherData.weatherDescription}`;
      feelsLike.textContent = `Fells like: ${weatherData.feelsLike}°`;
      temperature.textContent = `${weatherData.temperature}°`;
      maxTemperature.textContent = `Max Temperature: ${weatherData.maxTemperature}°`;
      minTemperature.textContent = `Min Temperature: ${weatherData.minTemperature}°`;
      humidity.textContent = `Humidity: ${weatherData.humidity} %`;
      wind.textContent = `Wind: ${weatherData.windSpeed} km/h`;

      searchResult.style.display = "flex";
    }
  }

  function handleErrorMessage(message) {
    const errorMessageContainer = document.querySelector(
      "#error-message-container"
    );
    const errorMessage = document.querySelector("#error-message");

    errorMessage.textContent = message;
    errorMessageContainer.style.display = "flex";

    setTimeout(() => {
      errorMessageContainer.style.display = "none";
    }, 3000);
  }

  return { renderResults, handleErrorMessage, handleDate };
})();

export default view;
