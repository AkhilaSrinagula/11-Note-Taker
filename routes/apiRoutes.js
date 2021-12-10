const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const noteData = require("../db/db.json");

router.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

router.post("/api/notes", (req, res) => {
  let newNote = req.body;
  newNote.id = uuidv4();
  console.log("This is the new note", newNote);
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let oldNotes = JSON.parse(data);
    oldNotes.push(newNote);
    console.log(oldNotes);
    fs.writeFile("./db/db.json", JSON.stringify(oldNotes), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

router.delete("/api/notes/:id", (req, res) => {
  let deleteNote = req.params.id;
  for (let i = 0; i < noteData.length; i++) {
    if (noteData[i].id === deleteNote) {
      noteData.splice(i, 1);
    }
  }

  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
  });
  deleteNote = noteData;
  res.json(deleteNote);
});

module.exports = router;
