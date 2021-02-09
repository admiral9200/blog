const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/checkAuthenticated');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('', authMiddleware,
    body('title').isString().trim(),
    body('content').isString(),
    body('summary').isString().trim()
    , (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let err = new Error("Validation failed!");
            err.errors = errors.array();
            err.status = 400;
            return next(err);
        }

        var postData = {
            title: req.body.title,
            imageurl: req.body.imageurl,
            content: req.body.content,
            summary: req.body.summary,
            user: req.session.userId,
            created: new Date()
        }

        Post.create(postData, (err, post) => {
            if (err)
                return next(err);
            return res.json({ success: true, message: 'Post created!', id: post._id });
        });
    });

router.put(':id', authMiddleware,
    body('title').isString().trim(),
    body('content').isString(),
    body('summary').isString().trim()
    , (req, res, next) => {
        if (!errors.isEmpty()) {
            let err = new Error("Validation failed!");
            err.errors = errors.array();
            err.status = 400;
            return next(err);
        }

        Post.findById(req.params['id'])
            .then((post) => {
                if (post.user != req.session.userId) {
                    let err = new Error("You are not allowed to modify this resource!");
                    err.status = 403;
                    return next(err);
                }

                post.title = req.body.title;
                post.imageurl = req.body.imageurl;
                post.content = req.body.content;
                post.summary = req.body.summary;
                post.lastUpdated = new Date();

                post.save();
                return res.json({success: true, message: 'Post updated!'})
            })
            .catch((error) => {
                let err = new Error("This resource has not been found!");
                err.status = 404;
                return next(err);
            });
    });

//router.get()

module.exports = router;