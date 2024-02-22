const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

// GET notes json data from database
router.get('/api/notes', async (req, res) => {
  const dbData = await JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
  res.json(dbData);
});

router.post('/api/notes', (req, res) => {
  const dbData = JSON.parse(fs.readFileSync('db/db.json', 'utf-8'));
  const noteData = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };

  dbData.push(noteData);
  fs.writeFileSync('db/db.json', JSON.stringify(dbData));
  res.json(dbData);
});

router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync('db/db.json', 'utf-8');
  const jsonData = JSON.parse(data);
  const newNote = jsonData.filter((note) => {
    return note.id !== req.params.id;
  });

  fs.writeFileSync('db/db.json', JSON.stringify(newNote));
  res.json('Note DELETED');
});

module.exports = router