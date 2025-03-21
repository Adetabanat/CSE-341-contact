const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// 🟢 Get All Contacts
const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contact').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching   contacts', error });
    }
};

// 🔵 Get a Single Contact
const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contact').findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error });
    }
};


// 🟠 Create a New Contact (POST)
const createContact = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
    
        const newContact = { firstName, lastName, email, favoriteColor, birthday };
        const result = await mongodb.getDatabase().db().collection('contact').insertOne(newContact);

        res.status(201).json({ message: 'Contact created', id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contact', error });
    }
};

// 🟡 Update a Contact (PUT)
const updateContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
        const result = await mongodb.getDatabase().db().collection('contact').updateOne(
            { _id: userId },
            { $set: updatedContact }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating contact', error });
    }
};

// 🔴 Delete a Contact (DELETE)
const deleteContact = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contact').deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
};

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
