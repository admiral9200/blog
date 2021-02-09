const express = require('express');
const router = express.Router();

router.all('', (req, res, next) => {
    req.session = null;
    res.json({success: true, message: "Logged out!"});
});

module.exports = router;