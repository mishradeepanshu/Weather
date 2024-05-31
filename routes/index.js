const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../models/Weather');

const API_KEY = 'b0d4c7d8dee646cab5f131431243105';

router.get('/', async (req, res) => {
    const filterCity = req.query.filter_city || '';
    const fromDate = req.query.from_date;
    const toDate = req.query.to_date;

    let filter = {};
    if (filterCity) filter.city = new RegExp(filterCity, 'i');
    filter.date = { $gte: fromDate, $lte: toDate };

    try {
        const weatherData = await Weather.find(filter);
        res.render('index', { weatherData: weatherData });
    } catch (error) {
        res.send(`An error occurred: ${error.message}`);
    }
});

router.post('/get_weather', async (req, res) => {
    const city = req.body.city;
    const days = req.body.days;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`;

    try {
        const response = await axios.get(url);
        const weatherData = response.data;

        const weatherEntries = weatherData.forecast.forecastday.map(day => ({
            city: city,
            date: day.date,
            temperature: day.day.avgtemp_c,
            condition: day.day.condition.text
        }));

        // Insert weather data into MongoDB
        await Weather.insertMany(weatherEntries);

        res.redirect('/');
    } catch (error) {
        res.send(`An error occurred: ${error.message}`);
    }
});

module.exports = router;
