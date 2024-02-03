const fs = require('fs');
const express = require('express');
const path = require('path');

const uuid = require('./helpers/uuid');

const PORT = process.env.PORT ?? 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/index.html'))
);

const api = require('./routes/index');
app.use('/api', api);

app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);