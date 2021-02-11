require('dotenv').config();
const express = require('express');
var session = require('cookie-session')
const mongoose = require('mongoose');

if(process.env.NODE_ENV != 'test') {
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, authSource: "admin"})
    .then(success => console.log('Database connected!'))
    .catch(err => console.log(err));
}

const app = express();
const bodyparser = require('body-parser');
app.use(session({
    name: 'simple-blog-session',
    secret: 'cookie-secret',
    httpOnly: true,
    maxAge: 24*60*60*1000
}));

app.use(express.static('app/dist'));
app.use('/api/', bodyparser.json(), require('./api/api'));

/** ERROR HANDLING */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    let errObj = {success: false, message: err.message};
    errObj.errors = err.errors || [];
    res.status(err.status || 500);
    res.json(errObj);
});

module.exports = app;