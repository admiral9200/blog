const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')

router.post('',
    body('email').isEmail().normalizeEmail(),
    body('username').isString().trim(),
    body('password').isLength({ min: 8 })
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.confirmPassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = new Error("Validation failed!");
            err.errors = errors.array();
            err.status = 400;
            return next(err);
        }
        const countEmail = User.countDocuments({ 'email': req.body.email });
        const countUsername = User.countDocuments({ 'username': req.body.username });
        const countAccs = User.countDocuments({});
        countAccs.exec((err, count) => {
            var usrlevel = count > 0 ? 0 : 3; // Set first User to Userlevel 3
            countEmail.exec((err, count) => {
                if (count > 0) {
                    let error = new Error('Email already registered');
                    error.status = 400;
                    return next(error);
                }
                countUsername.exec((err, count) => {
                    if (count > 0) {
                        let error = new Error('Username already registered');
                        error.status = 400;
                        return next(error);
                    }
                    var userData = {
                        email: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                        level: usrlevel
                    }
                    User.create(userData, (err, user) => {
                        if (err)
                            return next(err);
                        req.session.userId = user._id;
                        return res.json({success: true, message: 'Successfully registered!'});
                    });
                });
            });
        });
    });

module.exports = router;