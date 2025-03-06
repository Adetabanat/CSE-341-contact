const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("Welcome to the Contacts API");
});

router.use('/contact', require('./contact')); // Loads contact-related routes

module.exports = router;
