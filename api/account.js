const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.get('', (req, res) => {
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

module.exports = router;