const express = require('express');
const router = express.Router();
const connectDB = require('../db');
const { v4: uuidv4 } = require('uuid');
const domains = require('../utils/domains');
const logger = require('../utils/logger');

const expirationTimeInMinutes = parseInt(process.env.EXPIRATION_MINUTES) || 15;

// Générer une adresse email temporaire
router.get('/create-email', async (req, res) => {
  try {
    const db = await connectDB();

    if (!db) {
      logger.error('❌ La base de données est undefined !');
      return res.status(500).json({ error: 'Erreur connexion DB' });
    }

    if (!db.collection || typeof db.collection !== 'function') {
      logger.error('❌ La méthode collection n\'existe pas sur db !');
      return res.status(500).json({ error: 'La méthode collection est manquante sur db' });
    }

    const emails = db.collection('emails');

    if (!emails || typeof emails.insertOne !== 'function') {
      logger.error('❌ Collection emails non trouvée ou inaccessible !');
      return res.status(500).json({ error: 'Erreur accès collection emails' });
    }

    const localPart = uuidv4().slice(0, 8);
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${localPart}@${domain}`;
    await emails.insertOne({ address: email, createdAt: new Date() });

    logger.info(`Nouvelle adresse générée : ${email}`);
    res.json({ email });
  } catch (err) {
    logger.error('❌ Erreur lors de la création de l\'email temporaire :', err);
    res.status(500).json({ error: 'Erreur création email temporaire' });
  }
});

// Lister les emails encore actifs
router.get('/active-emails', async (req, res) => {
  try {
    const db = await connectDB();
    const emails = db.collection('emails');
    const active = await emails.find({}, { projection: { _id: 0, address: 1 } }).toArray();

    logger.info(`Requête : liste des emails actifs`);
    res.json({ activeEmails: active.map(e => e.address) });
  } catch (err) {
    logger.error('❌ Erreur liste emails actifs :', err);
    res.status(500).json({ error: 'Erreur accès emails actifs' });
  }
});

// Récupérer les messages pour un email donné
router.get('/inbox/:email', async (req, res) => {
  try {
    const db = await connectDB();
    const messages = db.collection('messages');
    const email = req.params.email.toLowerCase();

    if (!email.includes('@')) {
      logger.warn(`Tentative d'accès à une adresse email invalide : ${email}`);
      return res.status(400).json({ error: 'Adresse email invalide' });
    }

    const inbox = await messages.find({ to: { $regex: new RegExp(`^${email}$`, 'i') } })
      .project({ _id: 0, from: 1, subject: 1, text: 1, html: 1, date: 1 })
      .toArray();

    logger.info(`Consultation de la boîte de réception pour : ${email}`);

    res.json({ address: email, messages: inbox });
  } catch (err) {
    logger.error('❌ Erreur récupération messages inbox :', err);
    res.status(500).json({ error: 'Erreur accès inbox' });
  }
});

module.exports = router;
