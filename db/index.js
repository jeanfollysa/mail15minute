const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // ✅ Lire l'URI depuis Render
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ Connexion à MongoDB établie');
    return client.db(); // Tu peux aussi préciser le nom : client.db('mail15minute')
  } catch (err) {
    console.error('❌ Erreur de connexion MongoDB:', err);
    throw err;
  }
}

module.exports = connectDB;
