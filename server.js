require('dotenv').config();
const express = require('express');

const app = express();

app.get('/api/', (req, res) => {
    res.json({status: 'success', message: 'Welcome to the simple-blog API'});
});

const listener = app.listen(process.env.PORT, () => {
    console.log(`Hooray! Server is running on port ${listener.address().port}.`)
});

module.exports.app = app;
module.exports.server = listener;