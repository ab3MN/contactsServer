const express = require('express');
const router = express.Router();

const {
  getWeatherByLocationName,
  getWeatherByCoords,
} = require('../../controllers/weatherController');

router.get('/', getWeatherByLocationName);
router.get('/cords', getWeatherByCoords);

module.exports = router;
