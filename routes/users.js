const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validateUser = require('../middleware/validator');

router.get('/', usersController.getAll); // Read all
router.get('/:id', usersController.getSingle); // Read one
router.post('/', validateUser, usersController.createUser); // Create
router.put('/:id', validateUser, usersController.updateUser); // Update
router.delete('/:id', usersController.deleteUser); // Delete

module.exports = router;
