require('dotenv').config();
const express = require('express');

const app = express();

app.get('/api/', (req, res) => {
    res.json({status: 'success', message: 'Welcome to the simple-blog API'});
});

module.exports = app;