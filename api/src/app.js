const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const search = require('./api/search');

const app = express();

app.set('json spaces', 2);

app.use(helmet());
app.use(cors());

app.get('/healthcheck', (req, res, next) => res.sendStatus(200));

app.get('/api/search', search);

module.exports = app;
