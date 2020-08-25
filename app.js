const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(morgan('dev'));

app.listen(8000);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Body: ${req.body}
    Fresh: ${req.fresh}
    Method: ${req.method}
    Protocol: ${req.protocol}
    Secure: ${req.secure}
    `;
    res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end();
})

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});

app.get('/sum', (req, res) => {
  //Get the values from the request
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  //Validate the values
  if (!a) {
    return res.status(400).send('Please provide an integer value for a.');
  }
  if (!b){
    return res.status(400).send('Please provide an integer value for b.');
  }

  //Add the values
  const sum = a + b;

  //Return the message
  const message = `The sum of ${a} and ${b} is ${sum}`;
  res.send(message);
});

app.get('/cipher', (req, res) => {
  //Get values from request
  const text = req.query.text;
  const shift = req.query.shift;
  
  //Validate values
  if (!text) {
    return res.status(400).send('Please provide some text.');
  }
  if (!shift) {
    return res.status(400).send('Please provide an integer for shift.');
  }

  //Implement Caeser shift
  const encryptedText = [...text].map(char => {
    const character = String.fromCharCode(char.charCodeAt(0) - shift);
    return character;
  }).join('');

  //Return the message
  res.send(encryptedText);
});

app.get('/lotto', (req, res) => {
  //Get values from the request
  const queryArray = req.query.arr.map(number => parseInt(number));
  const randomArray = Array.from({length: queryArray.length}, () => Math.floor(Math.random() * 20));

  //Validate the values
  if (!req.query.arr) {
    return res.status(400).send('Please submit your query in the "arr=#" format with up to six entries.');
  }
  if (queryArray.length > 6) {
    return res.status(400).send('Please submit no more than six numbers in your query.');
  }
  queryArray.forEach(number => {
    let tooBig = false;
    if (number > 20) {
      tooBig = true;
    }
    if (tooBig) {
      return res.status(400).send('The query numbers cannot be more than 20.');
    }
  })

  //Compare the query and random arrays and count the number of matches
  let match = 0;
  queryArray.forEach((number, i) => {
    if (number === randomArray[i]) {
      return match++;
    }
  })

  //Return the appropriate response based on the value of match 
  match < 4
  ? res.send('Sorry, you lose') : 
  match === 4
  ? res.send('Congratulations, you win a free ticket') :
  match === 5
  ? res.send('Contratulations! You win $100!')
  : res.send('Wow! Unbelievable! You could have won the mega millions!');
});
