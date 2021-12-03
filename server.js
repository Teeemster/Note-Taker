//Import express
const express = require('express');

//Set up the server
//Const db = require('./db/db.json')
const PORT = process.env.PORT || 3001;

//Require path
const path = require('path')

//Initialize the app
const app = express();

// GET the initial HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Open Notes Page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//Flip server on and listen
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

// //API Routes
// app.get('/api/notes', (req, res) => {
//     res.send
// })