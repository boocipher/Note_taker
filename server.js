// Import express package
const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Require the JSON file and assign it to a variable called `termData`
const notesData = require('./db/db.json');
const PORT = process.env.PORT || 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Function to write data to the JSON file given a destination and some content
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

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
    console.log('note received: ', newNote);
    newNote.id = uuidv4();
    console.log('note w ID: ', newNote);
    notesData.push(newNote);

    writeToFile('./db/db.json', notesData);

  res.json(newNote);
 });
 
 app.delete('/api/notes/:id', (req, res) => {
    // Logic to delete a note with id
    const noteToDelete = req.params.id;
    console.log('the note to delete has id of : ',noteToDelete)
    let index = -1;
    for (let i=0; i < notesData.length; i++) {
        if (noteToDelete === notesData[i].id){
            index = i;
        }
    }
    if (index > -1) {
        notesData.splice(index, 1);
        writeToFile('./db/db.json', notesData);
        return res.json('Note deleted')
    }
    return res.json('Note not found')
   });
   

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
