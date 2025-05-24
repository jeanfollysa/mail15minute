const fs = require('fs');
const { simpleParser } = require('mailparser');
const sanitizeHtml = require('sanitize-html');
const path = require('path');

const MAX_EMAIL_SIZE = 1 * 1024 * 1024; // 1 Mo

function isValidEmailFormat(email) {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return regex.test(email);
}

function sanitize(content) {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(tag => tag !== 'script' && tag !== 'iframe'),
    allowedAttributes: false,
    disallowedTagsMode: 'discard',
  });
}

// Nettoie le champ texte en supprimant les entêtes MIME parasites
function cleanText(text) {
  if (!text) return '';
  return text.replace(/^Content-Type:.*\n?/gi, '').trim();
}

async function parseAndSanitizeEmail(filePath) {
  try {
    // Vérification de taille
    const stats = fs.statSync(filePath);
    if (stats.size > MAX_EMAIL_SIZE) {
      console.warn(`Fichier ignoré (trop volumineux) : ${path.basename(filePath)}`);
      return null;
    }

    const emlBuffer = fs.readFileSync(filePath);
    const parsed = await simpleParser(emlBuffer);

    const cleanedText = cleanText(parsed.text || '');
    const to = parsed.to?.text || '';

    // Vérification du format d'adresse email destinataire
    if (!isValidEmailFormat(to)) {
      console.warn(`Adresse email invalide : "${to}", fichier ignoré.`);
      return null;
    }

    return {
      from: parsed.from?.text || '',
      to: to,
      subject: sanitize(parsed.subject || ''),
      text: sanitize(cleanedText),
      html: parsed.html ? sanitize(parsed.html) : sanitize(cleanedText),
      date: parsed.date || new Date(),
    };

  } catch (err) {
    console.error(`Erreur lors du parsing du fichier ${filePath}:`, err);
    return null;
  }
}

module.exports = parseAndSanitizeEmail;
