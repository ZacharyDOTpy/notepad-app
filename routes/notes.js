const fs = require('fs');
const router = require('express').Router();
const {v4:uuidv4} = require('uuid');

router.get('/notes', (req, res) => {
  fs.readFile('./db/db.json', (err, notes) => {
    if (err) {
      throw err 
    } else {
      let notesData = JSON.parse(notes)
      res.json(notesData)
    }
  })
});

router.post('/notes', (req, res) => {
  const notesData = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'))
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }

  notesData.push(newNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(notesData))
  req.json(notesData)
});

router.delete('/notes/:id', (req, res) => {
  let notes = fs.readFileSync('./db/db.json', 'utf-8')
  let notesData = JSON.parse(notes)
  let filterNote = notesData.filter((notes) => {
    return note.id !== req.params.id
  })

  fs.writeFileSync('./db/db.json', JSON.stringify(filterNote))
  res.json({message: 'Note Deleted'})
});

module.exports = router