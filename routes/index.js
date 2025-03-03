const router = require('express').Router();

//router.get('/', (req, res) => { res.send('Damian') });

router.use('/contact', require('./contact'));
module.exports = router;