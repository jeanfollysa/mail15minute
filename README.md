Mail15Minute

Service d'email temporaire moderne – Recevez et lisez des emails jetables valides 15 minutes.

🚀 Installation
1. Cloner le projet :
git clone https://github.com/toncompte/mail15minute.git
cd mail15minute

2. Installer les dépendances :
npm install

3. Configurer les variables d'environnement :
Copier .env.example en .env et remplir avec tes informations confidentielles.

4. Lancer le serveur :
node index.js

5. Accéder au service :
- Frontend : Ouvre frontend/index.html dans ton navigateur
- API : http://localhost:3000/
---

⚙️ Variables d’environnement (.env)
Exemple de contenu :
PORT=3000
EXPIRATION_MINUTES=15
MONGO_URI=your_mongodb_connection_string
---

📁 Structure du projet

- index.js : Backend principal Node.js
- frontend/ : Interface utilisateur web
- emails/ : Stockage temporaire des emails reçus
- routes/ : Routes API
- utils/ : Fonctions utilitaires
- logs/ : Fichiers de logs
- db/ : Fonctions et modèles base de données
- sendTestEmail.js : Script d’envoi de mail test
- watchInbox.js : Surveillance et parsing d’emails reçus
- fakeSMTP.jar : Serveur SMTP local de test (optionnel)
- .env.example : Exemple de config pour démarrage rapide

---
🛡️ Sécurité
- Ne jamais versionner le fichier .env (seulement .env.example dans le repo)
- Veiller à sécuriser l’accès à la base de données MongoDB
---

👨‍💻 Auteurs
- Marley John
- Assistance technique : Jayden (ChatGPT)
---

🏁 Roadmap / TODO
- [x] Génération et suppression auto d’adresses
- [x] Interface web responsive
- [ ] Optimisation production
- [ ] Ajout alertes monitoring
---