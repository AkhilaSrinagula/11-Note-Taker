const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");

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
        if(err) throw err;
        res.json(newNote);

    })
  });
  // noteData.push(req.body);
  // fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
  //   if (err) throw err;
  // });
  // res.json(noteData);
});

module.exports = router;
