const express = require('express');
const moran = requires('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/apps', (req, res) => {
  
});