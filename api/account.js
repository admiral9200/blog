const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Post = require('../models/Post')
const authMiddleware = require('./middleware/checkAuthenticated');

router.get('', authMiddleware, (req, res, next) => {
    User.findById(req.session.userId)
    .then(user => {
        let retobj = {username: user.username, email: user.email, registered: user.registered, level: user.level}
        res.json({success: true, data: retobj});
    })
    .catch(err => {
        let error = new Error("Something went wrong..");
        error.status = 500;
        return next(error);
    })
});

router.get('/:username', (req, res, next) => {
    User.findOne({username: req.params['username']})
    .then(user => {
        if(!user)
            throw new Error();
        let retobj = {username: user.username, email: user.email, registered: user.registered, level: user.level}
        res.json({success: true, data: retobj});
    })
    .catch(err => {
        let error = new Error("User not found!");
        error.status = 404;
        return next(error);
    });
});

router.get('/:username/posts', (req, res, next) => {
    User.findOne({username: req.params['username']})
    .then(user => {
        Post.find({user: user._id}, null, {sort: {created: -1}})
        .then(posts => {
            return res.json({success: true, data: posts});
        })
        .catch(err => {
            let error = new Error("Something went wrong..");
            error.status = 500;
            return next(error);
        })
    })
    .catch(err => {
        let error = new Error("User not found!");
        error.status = 404;
        return next(error);
    });
});

module.exports = router;