const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database;


const initDb = async () => {
  if (database) {
    console.log(' ✅ Database already initialized!');
    return database;
  }
  try {
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect();
    database = client.db
    console.log(' ✅ Databse connection established!');
    return database;
  
  } catch (err) {
    console.error(' ❌ Failed to connect to the database:', err);
    throw err;
  }
};

const getDatabase = () => { 
  if (!database) {
    throw new Error(' ❌ Database not initialized! Please call initDB')
  }
  return database;
}

module.exports = {
  initDb,
  getDatabase,
};