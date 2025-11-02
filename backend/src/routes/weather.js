const express = require("express");
const router = express.Router();
const { getCities, getWeatherByCityCode } = require("../services/openWeather");

const { checkJwt } = require("../middleware/authz");

router.get("/", checkJwt, async (_, res) => {
  try {
    const cities = getCities();
    const weatherData = await Promise.all(
      cities.map((code) => getWeatherByCityCode(code))
    );
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

router.get("/:cityCode", checkJwt, async (req, res) => {
  try {
    const data = await getWeatherByCityCode(req.params.cityCode);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
