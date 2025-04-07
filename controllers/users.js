const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const mongodb = require('../data/database');

// GET all users
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('users').find();
    const users = await result.toArray();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
};

// GET single user
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    const users = await result.toArray();
    if (!users[0]) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(users[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
};

// POST - Create user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await mongodb.getDatabase().db().collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully', userId: response.insertedId });
    } else {
      res.status(500).json({ message: 'User creation failed' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};

// PUT - Update user
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const { firstName, lastName, email, password } = req.body;

    const user = {
      firstName,
      lastName,
      email,
      password,
    };

    const response = await mongodb.getDatabase().db().collection('users').updateOne(
      { _id: userId },
      { $set: user }
    );

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
