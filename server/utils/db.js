const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const config = { useNewUrlParser: true, useUnifiedTopology: true };

const client = new MongoClient(uri, config);

async function connectDB(dbName) {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log(`Connected to MongoDB server: ${dbName}.`);
    return db;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connectDB, client };
