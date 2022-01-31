// Import express package
const express = require('express');

// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile('index.html'));

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api', (req, res) => res.json(termData));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
