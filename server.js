//Import express
const express = require('express');

//Set up the server
//const db = require('./db/db.json')
const PORT = 3001;

//Initialize the app
const app = express();

// GET the initial HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

// //API Routes
// app.get('/api/notes', (req, res) => {
//     res.send
// })