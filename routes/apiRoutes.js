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
});

router.delete("/api/notes/:id", (req, res) => {
    let deleteNote = req.params.id;
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        try {
            let oldNotes = JSON.parse(data)
            oldNotes.push(newNote);
            console.log(oldNotes);
        } catch(e) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        for (let i = 0; i < oldNotes.length; i++) {
            if (oldNotes[i].id === deleteNote) {
                oldNotes.splice(i, 1);
                return;
            }
        }
        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(oldNotes), (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            }
            res.send("Successfully deleted");
        });
    })
})

module.exports = router;
