// db/index.js
const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db = null;

async function connectDB() {
  if (db) return db;

  try {
    await client.connect();
    db = client.db('mail15minute'); // Spécifie bien le nom de la base
    logger.info('✅ Connexion MongoDB réussie.');
    return db;
  } catch (err) {
    logger.error('❌ Erreur MongoDB :', err);
    throw err;
  }
}

module.exports = connectDB;
