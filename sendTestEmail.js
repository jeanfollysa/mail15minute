require('dotenv').config();
const { MongoClient } = require('mongodb');

// Remplace par l'adresse temporaire générée à l'étape 1
const emailDest = '2d6b7c9f@tetxi.com';

async function main() {
  const client = new MongoClient(process.env.MONGO_URI, {});

  try {
    await client.connect();
    const db = client.db(); // Utilise la base du URI
    const messages = db.collection('messages');

    await messages.insertOne({
      to: emailDest,
      from: 'expediteur@exemple.com',
      subject: 'Test de réception interne',
      text: 'Ceci est un test local',
      html: '<b>Ceci est un test local</b>',
      date: new Date()
    });

    console.log('✅ Email inséré avec succès');
  } catch (err) {
    console.error('Erreur lors de l\'insertion du mail:', err);
  } finally {
    await client.close();
  }
}

main();
