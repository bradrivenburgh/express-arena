const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');
const app = express();
app.use(morgan('dev'));
app.listen(8000);

app.get('/', (req, res) => {
  res.send('I\'m a root endpoint');
});

app.get('/apps', (req, res) => {
  // Get the values from the request
  const { genres, sort } = req.query;
  let results = playstore;

  // Validate the optional 'sort' and 'genres' parameters
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of "rating" or "app"');
    }
  }

  if (genres) {
    if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
      .includes(genres)) {
        res
          .status(400)
          .send('Genres must be one of "Action", "Puzzle", "Strategy", "Casual", "Arcade", or "Card"');
      }
  }

  // Implement the genre filter: must be one of the following
  // values: Action, Puzzle, Strategy, Casual, Arcade, Card.
  // Any other value results in an error. 
 
  if (genres) {
    results = results
      .filter((app) => genres === app.Genres)
  }

  // Implement the sorting functionality
  if (sort) {
    if (sort === 'App') {
      // This sort works better for alphabetical lists
      results
       .sort((a, b) => a[sort].localeCompare(b[sort]));
    } else {
      // This sort works well for everything else     
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }
  }

  // Return the results in json format
  res.json(results);
});