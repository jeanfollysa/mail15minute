const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'mail15minute';

let cachedDb = null;

async function connectDB() {
  if (!cachedDb) {
    await client.connect();
    const db = client.db(dbName);

    const emails = db.collection('emails');
    const messages = db.collection('messages');

    // Créer l'index TTL (15 minutes = 900 secondes)
    await emails.createIndex({ createdAt: 1 }, { expireAfterSeconds: 900 });

    cachedDb = { emails, messages };
  }

  return cachedDb;
}

module.exports = { connectDB };
