const fs = require('fs');
const notes = require('express').Router();
const dbPath = require('../db/db.json');
const path = require('path');

const uuid = require('../helpers/uuid');


notes.get('/', (req, res) => {
  const data = fs.readFileSync(dbPath, 'utf8');
  const notesDb = data ? JSON.parse(data) : [];

  res.json(notesDb)
});

notes.post('/', (req, res) => {
  const {title, text} = req.body;

  const newPost = {
    title,
    text,
    id: uuid()
  };

  const data = fs.readFileSync(dbPath, 'utf8');
  const notesDb = data ? JSON.parse(data) : [];
  notesDb.push(newPost)

  const dataString = JSON.stringify(notesDb, null, 2);

  fs.writeFileSync(dbPath, dataString)
  res.json(req.body)
});


module.exports = notes