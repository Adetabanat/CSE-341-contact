const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());  // Parses JSON body
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data

// Routes
app.use('/', require('./routes'));

// Connect to MongoDB and Start Server
mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to DB and listening on ${port}`);
        });
    }
});
