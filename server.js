const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes/index');
const pdfRouter = require('./routes/pdf');


// Connect to MongoDB
mongoose.connect('mongodb+srv://deepanshu:ZPb1ovwO24MvQOUH@cluster.g2k6eiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRouter);
app.use('/pdf', pdfRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});