const express = require('express');
const router = express.Router();
const Weather = require('../models/Weather');
const { generatePDF } = require('../utils/pdfGenerator');

router.get('/generate_pdf', async (req, res) => {
    try {
        const weatherData = await Weather.find();
        await generatePDF(weatherData);
        res.send('PDF generated successfully');
    } catch (error) {
        res.status(500).send(`An error occurred: ${error.message}`);
    }
});

module.exports = router;
