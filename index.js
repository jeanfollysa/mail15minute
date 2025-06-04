require('dotenv').config();

const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const connectDB = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Connexion MongoDB explicitement lancée ici
connectDB();

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l’API Mail15Minute 🚀');
});

// Routes
const emailRoutes = require('./routes/emailRoutes');
app.use('/', emailRoutes);

// Surveillance des .eml
require('./watchInbox');

app.listen(port, () => {
  logger.info(`✅ Serveur Mail15Minute actif sur http://localhost:${port}`);
});
