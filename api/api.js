const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to the simple-blog API'});
});

router.use('/register', require('./register'));

module.exports = router;