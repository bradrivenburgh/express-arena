const express = require('express');
const morgan = require('morgan');
const app = express();

// Set up logger
app.use(morgan('dev'));

// Listen to port 8000
app.listen(8000);

module.exports = app;