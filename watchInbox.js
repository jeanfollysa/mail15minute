const fs = require("fs");
const path = require("path");
const parseAndSanitizeEmail = require("./parseAndSanitizeEmail");
const EMAIL_DIR = path.join(__dirname, "emails");

console.log("📡 Surveillance du dossier 'emails/' en cours...");

fs.watch(EMAIL_DIR, (eventType, filename) => {
  if (eventType === "rename" && filename.endsWith(".eml")) {
    const filepath = path.join(EMAIL_DIR, filename);

    // Petite attente pour s'assurer que le fichier est bien écrit
    setTimeout(() => {
      if (fs.existsSync(filepath)) {
        parseAndSanitizeEmail(filepath)
          .then(() => {
            console.log(`✅ Email automatiquement stocké : ${filename}`);
          })
          .catch((err) => {
            console.error(`❌ Erreur lors du traitement automatique de ${filename}`, err);
          });
      }
    }, 500); // 0,5s d'attente
  }
});
