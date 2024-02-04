const fs = require('fs');
const router = require('express').Router();
const {v4:uuidv4} = require('uuid');

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