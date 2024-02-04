const fs = require('fs');
const router = require('express').Router();
const {v4:uuidv4} = require('uuid');

// GET notes json data from database
router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, notes) => {
    if (err) {
      throw err 
    } else {
      let noteData = JSON.parse(notes)
      res.json(noteData)
    }
  })
});

// POST new note json data to database & create unique uuid
router.post('/notes', (req, res) => {
  const noteData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  const newNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }

  noteData.push(newNotes)
  fs.writeFileSync('./db/db.json', JSON.stringify(noteData))
  req.json(noteData)
});

// DELETE note json data by :id
router.delete('/notes/:id', (req, res) => {
  let note = fs.readFileSync('./db/db.json', 'utf-8')
  let noteData = JSON.parse(note)
  let filterNote = noteData.filter((notes) => {
    return notes.id !== req.params.id
  })

  fs.writeFileSync('./db/db.json', JSON.stringify(filterNote))
  res.json({message: 'Note Deleted'})
});

module.exports = router