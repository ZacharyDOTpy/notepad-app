const express = require('express');
const path = require('path');
const api = require('./routes/index');

const PORT = process.env.PORT ?? 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', api);

// route to homepage
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/index.html'))
);

// route to notes api
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'views/notes.html'))
);

// listens for the port being used
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);