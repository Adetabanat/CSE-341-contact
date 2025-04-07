// routes/index.js

const express = require('express');
const router = express.Router();

// Swagger documentation route (e.g., /api-docs)
router.use('/', require('./swagger'));

// Users CRUD routes (e.g., /users)
router.use('/users', require('./users'));

// You can add more route modules like:
// router.use('/products', require('./products'));

module.exports = router;
