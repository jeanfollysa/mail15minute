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
    db = client.db('mail15minute');
    
    logger.info('✅ Connexion MongoDB réussie à la base :', db.databaseName);

    logger.info('🔵 Objet db retourné:', db, 'Nom:', db && db.databaseName);
    return db;
  } catch (err) {
    logger.error('❌ Erreur MongoDB :', err);
    throw err;
  }
}


module.exports = connectDB;
