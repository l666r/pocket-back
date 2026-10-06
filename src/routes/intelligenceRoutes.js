const express = require('express');
const router = express.Router();
const { getCityData, listCities } = require('../controllers/intelligenceController');

router.get('/cities', listCities);
router.get('/city/:cityName', getCityData);

module.exports = router;
