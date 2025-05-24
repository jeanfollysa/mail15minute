// scanInbox.js
const fs = require('fs');
const path = require('path');
const { connectDB } = require('./db');
const parseAndSanitizeEmail = require('./parseAndSanitizeEmail');

// Chemin absolu vers le dossier contenant les .eml
const EMAIL_DIR = 'C:\\Users\\User\\Desktop\\mail15minute\\emails';

async function scanInbox() {
  const { messages } = await connectDB();

  const files = fs.readdirSync(EMAIL_DIR).filter(file => file.endsWith('.eml'));

  for (const file of files) {
    const filePath = path.join(EMAIL_DIR, file);

    try {
      const emailData = await parseAndSanitizeEmail(filePath);

      if (emailData) {
        // Insertion dans MongoDB
        await messages.insertOne(emailData);
        console.log(`✅ Email stocké : ${file}`);
      } else {
        console.warn(`⚠️ Email ignoré (non valide ou trop lourd) : ${file}`);
      }

      // Supprime le fichier après traitement
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`❌ Erreur lors du traitement de ${file}:`, err);
    }
  }
}

scanInbox();
