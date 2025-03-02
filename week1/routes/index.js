const express = require('express');
const router = express.Router();

router.use('/contact', require('./contact'))

module.exports = router;