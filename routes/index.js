// routes/index.js

const express = require('express');
const router = express.Router();

// Swagger documentation route (e.g., /api-docs)
router.use('/', require('./swagger'));

// Users CRUD routes (e.g., /users)
router.use('/users', require('./users'));



module.exports = router;
