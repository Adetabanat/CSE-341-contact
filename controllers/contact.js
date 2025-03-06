const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');  

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('contact').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

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

module.exports = { getAll, getSingle };
