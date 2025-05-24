// test-email-server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 2525,
    secure: false,
    tls: { rejectUnauthorized: false }
  });

  try {
    await transporter.sendMail({
      from: 'noreply@mail15minute.com',
      to,
      subject,
      text
    });

    res.json({ success: true, message: 'Email envoyé avec succès' });
  } catch (err) {
    console.error('❌ Erreur lors de l’envoi :', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => {
  console.log(`📨 Serveur de test d'envoi actif sur http://localhost:${port}`);
});
