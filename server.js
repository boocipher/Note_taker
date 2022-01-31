// Import express package
const express = require('express');
const path = require('path');
const fs = require('fs');

// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');
const PORT = 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html'))); //serves notes.html
// app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get('/api/notes', (req, res) => res.json(notesData));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const newNote = req.body
    console.log('note received: ', newNote)
    // writeToFile(destination, newReview)
 
  res.json(newNote);
 });
 

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
