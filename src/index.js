import weather from "./modules/weather";
import view from "./modules/view";

document.addEventListener("DOMContentLoaded", () => {
  view.handleDate();
});

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
  if (searchInput.value === "") {
    view.handleErrorMessage("You must enter City Name!");
  } else {
    const weatherData = await weather.getData(searchInput.value);
    view.renderResults(weatherData);
  }
});
