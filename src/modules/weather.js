import view from "./view";

const weather = (() => {
  function convertData(data) {
    const cityName = data.name;
    const icon = data.weather[0].icon;
    const weatherDescription =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
    const feelsLike = Math.round(data.main.feels_like);
    const temperature = Math.round(data.main.temp);
    const maxTemperature = Math.round(data.main.temp_max);
    const minTemperature = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    return {
      cityName,
      icon,
      weatherDescription,
      feelsLike,
      temperature,
      maxTemperature,
      minTemperature,
      humidity,
      windSpeed,
    };
  }

  async function getData(city) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7eb45f3d586fd5796793458d6c576e47`;
    try {
      const response = await fetch(endpoint, { mode: "cors" });
      if (!response.ok) throw new Error(`City ${city} not found`);
      const data = convertData(await response.json());
      return data;
    } catch (error) {
      view.handleErrorMessage(error);
      return null;
    }
  }
  return { getData };
})();

export default weather;
