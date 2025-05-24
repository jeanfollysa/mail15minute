require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
const emailRoutes = require('./routes/emailRoutes');
app.use('/', emailRoutes);

// Surveillance automatique des .eml
require('./watchInbox');

app.listen(port, () => {
  logger.info(`✅ Serveur Mail15Minute actif sur http://localhost:${port}`);
});
