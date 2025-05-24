const path = require('path');
const { simpleParser } = require('mailparser');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

function sanitize(content) {
  return sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
    disallowedTagsMode: 'discard',
  });
}

async function parseEmail(filePath) {
  try {
    const emlBuffer = fs.readFileSync(filePath);
    const parsed = await simpleParser(emlBuffer);

    const clean = {
      from: parsed.from?.text || '',
      to: parsed.to?.text || '',
      subject: sanitize(parsed.subject || ''),
      text: sanitize(parsed.text || ''),
      html: sanitize(parsed.html || ''),
      date: parsed.date || new Date(),
    };

    console.log("📩 Email parsé et sanitisé :");
    console.log(JSON.stringify(clean, null, 2));
  } catch (err) {
    console.error("❌ Erreur pendant le parsing :", err);
  }
}

const testFile = path.join(__dirname, 'test-emails', 'test1.eml');
parseEmail(testFile);
