const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'mail15minute';

async function init() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();

  const db = client.db(DB_NAME);

  const collections = await db.listCollections({ name: 'messages' }).toArray();
  if (collections.length > 0) {
    console.log('ℹ️ La collection "messages" existe déjà. Suppression...');
    await db.collection('messages').drop();
    console.log('🗑️ Collection supprimée.');
  }

  await db.createCollection('messages', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['subject', 'from', 'to', 'text', 'date'],
        properties: {
          subject: { bsonType: 'string' },
          from: { bsonType: 'string' },
          to: { bsonType: 'string' },
          text: { bsonType: 'string' },
          date: { bsonType: 'date' }
        }
      }
    }
  });

  console.log('✅ Collection "messages" créée avec validation.');

  // Index pour recherches rapides
  await db.collection('messages').createIndex({ to: 1 });
  // Index TTL : supprime automatiquement les messages après 15 minutes
  await db.collection('messages').createIndex({ date: 1 }, { expireAfterSeconds: 900 });

  console.log('🔎 Index ajouté sur "to".');
  console.log('⏱️ Index TTL ajouté sur "date" (expiration après 15 minutes).');

  await client.close();
}

init().catch(console.error);
