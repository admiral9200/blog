const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/checkAuthenticated');

router.get('/', (req, res) => {
    res.json({success: true, message: 'Welcome to the simple-blog API'});
});

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/account', authMiddleware, require('./account'));

router.use(require('./middleware/catchMethods'));

module.exports = router;