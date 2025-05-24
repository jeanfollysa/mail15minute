const express = require('express');
const router = express.Router();
const { connectDB } = require('../db');
const { v4: uuidv4 } = require('uuid');
const domains = require('../utils/domains');
const logger = require('../utils/logger');

const expirationTimeInMinutes = parseInt(process.env.EXPIRATION_MINUTES) || 15;

// Générer une adresse email temporaire
router.get('/create-email', async (req, res) => {
  const { emails } = await connectDB();

  const localPart = uuidv4().slice(0, 8);
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const email = `${localPart}@${domain}`;
  await emails.insertOne({ address: email, createdAt: new Date() });

  logger.info(`Nouvelle adresse générée : ${email}`);

  res.json({ email });
});

// Lister les emails encore actifs
router.get('/active-emails', async (req, res) => {
  const { emails } = await connectDB();

  const active = await emails.find({}, { projection: { _id: 0, address: 1 } }).toArray();

  logger.info(`Requête : liste des emails actifs`);

  res.json({ activeEmails: active.map(e => e.address) });
});

// Récupérer les messages pour un email donné
router.get('/inbox/:email', async (req, res) => {
  const { messages } = await connectDB();
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
});

module.exports = router;
