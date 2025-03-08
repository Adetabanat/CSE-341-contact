const router = require('express').Router();

router.use('/', require('./swagger'));

router.get("/", (req, res) => {
    res.send("Welcome to the Contacts API");
});

router.use('/contact', require('./contact'));

module.exports = router;
