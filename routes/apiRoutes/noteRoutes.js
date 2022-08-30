const router = require("express").Router();
let notes = require("../../db/db.json");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const { json } = require("express");


// get notes form the db
router.get("/notes", (req, res) => {
    res.json(notes);
});

//delete notes
router.delete("/notes/:id", (req, res) => {
    notes = notes.filter((el) => el.id !== req.params.id);
    fs.writeFile(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes),
        function(err) {
            if (err) {
                res.status(404).json({ error:  err });
            }
            res.json(notes);
        }
    );
});

//add new note to db
router.post("/notes", (req, res) => {
    const newNote = { ...req.body, id: uuidv4()};
    notes.unshift(newNote);
    fs.writeFile(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(notes),
        function(err) {
            if (err) {
                res.status(404).json({ error: err });
            }
            res.json(notes);
        }
    );
});




module.exports = router;