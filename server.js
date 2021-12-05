//Import express
const express = require('express');

//Import FS for FSwriteFile
const fs = require('fs');

//Helper for unique IDs
const uuiD = require('./helpers/uuid');

//Set up the server
const PORT = process.env.PORT || 3001;

//Require path
const path = require('path')

//Import data
const noteData = require('./db/db.json');
const { json } = require('express');

//Initialize the app
const app = express();

//Middleware
//Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//Parse incoming json
app.use(express.json());
//Show HTML and JS
app.use(express.static("public"));

// GET the initial HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Open Notes Page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


//Retrieve existing notes
app.get('/api/notes', (req, res) => {
for (let i = 0; i < noteData.length; i++) {
 JSON.parse(noteData)    
}
});

//Wildcard Route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

//Post request to add new notes
app.post('/api/notes', (req, res) => {

    //Destructure assignment for items in req.body
    const { title, text } = req.body;

    //if the items are present
    if (title && text) {

        //Save items as a variable in an object
        const newNotes = {
            title,
            text,
            notes_id: uuiD(),
        }

        //Pull data from db.json
        const notes = JSON.parse(fs.readFileSync('./db/db.json'));

        //Push new notes into the array
        const updatedNotes = [...notes, newNotes];

        //Convert to a string so it can be saved
        const newNotesString = JSON.stringify(updatedNotes);

        //Write the string to our file
        fs.writeFile(`./db/db.json`, newNotesString, (err) =>

            err
                ? console.error(err)
                : console.log(`Notes for ${newNotes.title} has been written to JSON file.`)
        );

    }

});

//Flip server on and listen
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
