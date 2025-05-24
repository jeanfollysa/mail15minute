const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 2525, // Port utilisé par FakeSMTP
  secure: false,
  tls: {
    rejectUnauthorized: false
  }
});

const mailOptions = {
  from: '"Test Mail" <test@monservice.com>',
  to: "1721aa88@fevi.com", // 👈 Adresse temporaire à jour
  subject: "Message de test",
  text: "Ceci est un test de réception d’email sur le service Mail15Minute."
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error("❌ Erreur lors de l’envoi :", error);
  }
  console.log("✅ Email envoyé avec succès :", info.messageId);
});
