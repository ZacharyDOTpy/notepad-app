const fs = require('fs');
const notes = require('express').Router();
const data = require('../db/db.json');
const path = require('path');

const uuid = require('../helpers/uuid');


notes.get('/', (req, res) => {
  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notesDb = data ? JSON.parse(data) : [];

  res.json(notesDb)
});

notes.post('/', (req, res) => {
  const {title, text} = req.body;

  const newNote = {
    title,
    text,
    id: uuid()
  };

  const data = fs.readFileSync('./db/db.json', 'utf8');
  const notesDb = data ? JSON.parse(data) : [];
  notesDb.push(newNote)

  const dataString = JSON.stringify(notesDb, null, 2);

  fs.writeFileSync('./db/db.json', dataString)
  res.json(req.body)
});


module.exports = notes