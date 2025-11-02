const fs = require("fs");
const path = require("path");
const axios = require("axios");
const NodeCache = require("node-cache");
const { timeStamp } = require("console");

const cache = new NodeCache({ stdTTL: 300 });

const OWM_KEY = process.env.OPENWEATHER_API_KEY;
if (!OWM_KEY) {
  console.error("OPENWEATHER_API_KEY missing in env");
}

function getCities() {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "data", "cities.json"),
    "utf8"
  );
  const arr = JSON.parse(raw).List;
  return arr.map((i) => i.CityCode || i.cityCode || i.citycode);
}

async function fetchFromAPI(cityCode) {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${OWM_KEY}&units=metric`;
  const response = await axios.get(url);

  const { name, weather, main, wind, visibility, sys } = response.data;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return {
    id: cityCode,
    name,
    description: weather?.[0]?.description || "",
    temp: main?.temp,
    tempMin: main?.temp_min,
    tempMax: main?.temp_max,
    feelsLike: main?.feels_like,
    pressure: main?.pressure,
    humidity: main?.humidity,
    visibility: visibility / 1000,
    windSpeed: wind?.speed,
    windDeg: wind?.deg,
    sunrise: formatTime(sys?.sunrise),
    sunset: formatTime(sys?.sunset),
    country: sys?.country,
    raw: response.data,
  };
}

async function getWeatherByCityCode(cityCode) {
  const key = `weather:${cityCode}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const data = await fetchFromAPI(cityCode);
  cache.set(key, data);
  return data;
}

module.exports = { getCities, getWeatherByCityCode };
