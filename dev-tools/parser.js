// parser.js
const fs = require('fs');
const path = require('path');
const { connectDB } = require('./db');
const parseAndSanitizeEmail = require('./parseAndSanitizeEmail');

const EMAIL_DIR = path.join(__dirname, 'emails');
const BACKUP_DIR = path.join(__dirname, 'emails_backup');

// S'assurer que le dossier de sauvegarde existe
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR);
}

async function parseAndStoreEmail(fileName) {
  const filePath = path.isAbsolute(fileName) ? fileName : path.join(EMAIL_DIR, fileName);
  const backupPath = path.join(BACKUP_DIR, path.basename(fileName));

  const { messages } = await connectDB();

  try {
    const emailData = await parseAndSanitizeEmail(filePath);

    if (emailData) {
      await messages.insertOne(emailData);
      console.log(`✅ Email stocké dans Mongo : ${fileName}`);

      // Sauvegarder une copie dans emails_backup/
      fs.copyFileSync(filePath, backupPath);
      console.log(`🗂️ Copie de sauvegarde enregistrée : ${backupPath}`);
    } else {
      console.warn(`⚠️ Email ignoré (non valide ou trop lourd) : ${fileName}`);
    }

    // Supprimer le fichier original
    fs.unlinkSync(filePath);
    console.log(`🧹 Fichier supprimé : ${filePath}`);
  } catch (err) {
    console.error(`❌ Erreur lors du traitement de ${fileName} :`, err);
  }
}

module.exports = { parseAndStoreEmail };
