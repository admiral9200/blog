const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to the simple-blog API'});
});

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));

module.exports = router;