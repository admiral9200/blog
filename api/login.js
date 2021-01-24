const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user.js');

router.post('',
    body('email').isEmail().trim(),
    body('password').isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = new Error("Validation failed!");
            err.errors = errors.array();
            err.status = 400;
            return next(err);
        }
        User.authenticate(req.body.email, req.body.password)
            .then(user => {
                req.session.userId = user._id;
                return res.json({success: true, message: 'Successfully signed in!'});
            })
            .catch(err => {
                var err = new Error('Wrong email or password..');
                err.status = 401;
                return next(err);
            });
    }
);

router.all('', (req, res, next) => {
    let err = new Error('Method Not Allowed');
    err.status = 405
    next(err);
});

module.exports = router;