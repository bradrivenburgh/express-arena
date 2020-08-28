const app = require('./app');

// Set up root endpoint
app.get('/', (req, res) => {
  res.send('Hello Express!')
});