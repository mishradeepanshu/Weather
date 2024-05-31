const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    date: String,
    temperature: Number,
    
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
