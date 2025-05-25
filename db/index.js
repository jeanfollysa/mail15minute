const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  tls: true,
  tlsAllowInvalidCertificates: false
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connexion MongoDB établie");
    return client.db(); // nom de la base déduit automatiquement de l'URI
  } catch (err) {
    console.error("❌ Erreur MongoDB :", err);
    throw err;
  }
}

module.exports = connectDB;
