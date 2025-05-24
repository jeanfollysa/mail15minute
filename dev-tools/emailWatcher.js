const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { simpleParser } = require('mailparser');
const { MongoClient } = require('mongodb');

const EMAILS_DIR = path.join(__dirname, 'emails');
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'mail15minute';

(async () => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  const db = client.db(DB_NAME);
  const messages = db.collection('messages');

  console.log('📦 Connexion à MongoDB établie.');
  console.log('👀 Surveillance du dossier :', EMAILS_DIR);

  chokidar.watch(EMAILS_DIR, { ignoreInitial: true })
    .on('add', async filePath => {
      console.log('📥 Nouveau fichier détecté :', path.basename(filePath));
      const emlBuffer = fs.readFileSync(filePath);

      try {
        const parsed = await simpleParser(emlBuffer);
        const to = parsed.to?.value?.[0]?.address || null;
        const from = parsed.from?.value?.[0]?.address || 'unknown@unknown.com';
        const subject = parsed.subject || '(Pas de sujet)';
        const text = parsed.text || '';
        const date = parsed.date || new Date();

        console.log(`📨 Email parsé.\n   To     : ${to}\n   From   : ${from}\n   Sujet  : ${subject}`);

        if (!to) {
          console.warn('⚠️ Aucun destinataire trouvé dans l’email.');
          return;
        }

        await messages.insertOne({ to, from, subject, text, date });
        console.log(`✅ Message sauvegardé pour ${to}`);
      } catch (err) {
        console.error('❌ Erreur d’analyse de l’email :', err);
      }
    });
})();
