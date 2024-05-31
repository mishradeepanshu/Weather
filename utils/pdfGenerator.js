const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generatePDF(weatherData) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream('weather_report.pdf');
        doc.pipe(writeStream);

        doc.fontSize(12).text('Weather Report', { align: 'center' }).moveDown();
        weatherData.forEach(entry => {
            doc.fontSize(10).text(`City: ${entry.city}, Date: ${entry.date}, Temperature: ${entry.temperature} °C`);
        });

        doc.end();
        writeStream.on('finish', () => resolve());
        writeStream.on('error', (error) => reject(error));
    });
}

module.exports = { generatePDF };
