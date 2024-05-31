const axios = require('axios');

const fetchWeather = async (city, days) => {
    const apiKey = process.env.WEATHER_API_KEY; // Ensure you have this key set in your .env file
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`;

    try {
        const response = await axios.get(url);
        if (response.data && response.data.forecast) {
            return response.data;
        } else {
            throw new Error('Invalid API response');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Error fetching weather data');
    }
};

module.exports = { fetchWeather };
