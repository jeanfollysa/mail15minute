// insertTestMessage.js
const { connectDB } = require('./db');

async function insertTestMessage() {
  const { messages } = await connectDB();

  const testMessage = {
    from: 'test@example.com',
    to: '5998bb45@biiam.com',
    subject: 'Message de test',
    text: 'Ceci est un message de test pour vérifier la récupération des emails.',
    html: '<p>Ceci est un message de test pour vérifier la récupération des emails.</p>',
    date: new Date(),
  };

  await messages.insertOne(testMessage);
  console.log('✅ Message test inséré avec succès !');
  process.exit(0);
}

insertTestMessage().catch(err => {
  console.error('Erreur insertion message test:', err);
  process.exit(1);
});
