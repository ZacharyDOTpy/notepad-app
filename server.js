const express = require('express');
const htmlRoutes = require('./routes/html');
const apiRoutes = require('./routes/api');

const PORT = process.env.PORT ?? 3001;

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(htmlRoutes);
app.use(apiRoutes);

// listens for the port being used
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);