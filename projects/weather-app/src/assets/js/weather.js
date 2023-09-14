const WEATHER_API = "20f7632ffc2c022654e4093c6947b4f4";


// Builds request url to obtain coordinates
function buildRequestCoordsUrl(cityName) {
  return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${WEATHER_API}`;
}

// Builds request url to obtain weather forecast
function buildRequestForecastUrl(coordinates, units = "metric") {
  return `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,alerts&units=${units}&appid=${WEATHER_API}`;
}

// Returns coordinates and city name for a specified city name.
async function getCoords(url) {
  const response = await fetch(url);
  const weatherData = await response.json();
  const { coord } = weatherData;
  coord.name = weatherData.name;
  coord.country = weatherData.sys.country;


  return coord;
}

// Returns forecast data for specified coordinates.
async function getForecast(url) {
  const response = await fetch(url);
  const forecastData = await response.json();

  return forecastData;
}

async function getWeatherData(location, unit = "metric") {
  try {
    const locationURL = buildRequestCoordsUrl(location)
    const coords = await getCoords(locationURL)

    const forecastURL = buildRequestForecastUrl(coords, unit)

    const weatherData = await getForecast(forecastURL)

    weatherData.name = coords.name;
    weatherData.country = coords.country;

    return weatherData
  }
  catch (err) {
    return {
      error: true,
      statement: err
    }
  }
}

export default getWeatherData


