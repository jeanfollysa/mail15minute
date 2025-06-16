console.log("✅ script.js chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const emailDisplay = document.getElementById("emailDisplay");
  const inbox = document.getElementById("inbox");
  const generateBtn = document.getElementById("generateBtn");
  const toggleHtmlBtn = document.getElementById("toggleHtmlBtn");
  const copyBtn = document.getElementById("copyBtn"); // Sélection du bouton "Copier"
  const timerDisplay = document.getElementById("timer"); // Sélection de l'affichage du timer

  let currentEmail = null;
  let showHtmlContent = false;
  let timerInterval;

  // Fonction de minuterie
  let timeLeft = 15 * 60; // 15 minutes en secondes

  function startTimer() {
    // Réinitialiser le minuteur chaque fois qu'un nouvel email est généré
    clearInterval(timerInterval); // Arrêter l'ancien minuteur
    timeLeft = 15 * 60; // Réinitialiser à 15 minutes

    timerInterval = setInterval(() => {
      timeLeft--; // Réduire d'une seconde chaque fois
      let minutes = Math.floor(timeLeft / 60);
      let seconds = timeLeft % 60;
      timerDisplay.textContent = `Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = "Time's up!";
        emailDisplay.textContent = "Email expired"; // Afficher que l'email a expiré
      }
    }, 1000);
  }

  // Démarrer la minuterie lorsque l'adresse email est générée
  if (generateBtn) {
    generateBtn.addEventListener("click", async () => {
      console.log("🔁 Bouton 'Email' cliqué !");
      try {
        // 👉 URL relative, compatible Render !
        const res = await fetch("/create-email");
        const data = await res.json();
        currentEmail = data.email;
        emailDisplay.textContent = currentEmail;
        inbox.innerHTML = "<p>Loading messages...</p>";
        copyBtn.style.display = 'inline-block'; // Le bouton devient visible
        toggleHtmlBtn.disabled = false;

        // Démarrer la minuterie dès qu'un email est généré
        startTimer();
      } catch (err) {
        emailDisplay.textContent = "Erreur de connexion.";
        inbox.innerHTML = "";
        toggleHtmlBtn.disabled = true;
      }
    });
  }

  // Événement pour le bouton "Copier l'adresse"
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      if (currentEmail) {
        navigator.clipboard.writeText(currentEmail)
          .then(() => {
            // Créer et afficher la notification de confirmation
            const toast = document.createElement('div');
            toast.classList.add('toast');
            toast.textContent = 'Email copied to clipboard!';
            document.body.appendChild(toast);

            // Ajouter un délai pour faire disparaître le toast
            setTimeout(() => {
              toast.remove();
            }, 2000); // Le toast disparait après 2 secondes
          })
          .catch(err => {
            console.error('Erreur lors de la copie : ', err);
          });
      }
    });
  }

  toggleHtmlBtn.addEventListener("click", () => {
    showHtmlContent = !showHtmlContent;
    toggleHtmlBtn.textContent = showHtmlContent ? "Show Plain Text" : "Show HTML";
    if (currentEmail) fetchInbox(currentEmail);
  });

  async function fetchInbox(email) {
    console.log("🔎 Récupération de la boîte pour :", email);
    try {
      // 👉 URL relative, compatible Render !
      const res = await fetch(`/inbox/${email}`);
      const data = await res.json();

      if (data.messages.length === 0) {
        inbox.innerHTML = "<p>No messages yet.</p>";
        return;
      }

      inbox.innerHTML = "";
      data.messages.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";

        const messageContent = showHtmlContent && msg.html
          ? msg.html
          : escapeHtml(msg.text);

        div.innerHTML = `
          <p><strong>From:</strong> ${escapeHtml(msg.from)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(msg.subject)}</p>
          <p><strong>Message:</strong><br>${messageContent}</p>
          <p class="date">${new Date(msg.date).toLocaleString()}</p>
        `;
        inbox.appendChild(div);
      });
    } catch (err) {
      inbox.innerHTML = "<p>Erreur lors du chargement des messages.</p>";
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
