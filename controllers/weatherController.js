const axios = require('axios');
const chekingNumbers = require('../helpers/chekingNumbers');

const getWeatherByLocationName = async (req, res, next) => {
  try {
    const { location } = req.query;
    const weather = await axios.get(
      process.env.WEATHER_URL +
        `?q=${location}&appid=${process.env.WEATHER_KEY}`
    );
    res.send(weather.data);
  } catch (e) {
    next(e);
  }
};

const getWeatherByCoords = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    const _lat = chekingNumbers(lat, -90, 90);
    const _lon = chekingNumbers(lon, -180, 180);

    (!_lat || !_lon) &&
      res.status(400).json({
        message: 'Incorrect coordinates',
      });

    const { data } = await axios.get(
      process.env.WEATHER_URL +
        `?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`
    );
    const icon =
      'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    res.send({
      ...data,
      icon,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { getWeatherByLocationName, getWeatherByCoords };
