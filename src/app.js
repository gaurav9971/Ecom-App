const express = require('express');
require('./db/mongoose');
const app = express();
const api = require('./routes/api');
const storeData = require('../data/data.store');

app.use(express.json());
app.use('/api/v1', api);
storeData();

module.exports = app;
