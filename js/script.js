document.addEventListener('DOMContentLoaded', function () {
// Redirection au clic sur le lien dropdown
  var dropdownLink = document.getElementById('dropdown07');
  if (dropdownLink) {
    dropdownLink.addEventListener('click', function (e) {
      // Aller directement sur la page services.html
      window.location.href = this.href;
    });
  }

//API pour les membres de l'equipe
  function getRandomRole(i) {
    const roles = [
      "CEO & Expert en SEO",
      "Responsable RH",
      "Responsable Marketing",
      "Chef de Projet",
      "Developpeur SEO Senior",
      "Analyste Données",
      "UX Designer",
      "Service Client"
    ];
    return roles[i];
  }

  fetch("https://randomuser.me/api/?results=8&nat=fr")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("teamContainer");
    let i=0;
    data.results.forEach(user => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const role = getRandomRole(i); 
      const image = user.picture.large;

      const card = document.createElement("div");
      card.className = "card";
      card.style.backgroundImage = `url('${image}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";

      card.innerHTML = `
        <div class="card-content">
          <h3>${fullName}</h3>
          <p>${role}</p>
        </div>
      `;

      container.appendChild(card);
      i++;
    });
  })
  .catch(error => console.error("Erreur API :", error));

  
// API pour l'avis
fetch("https://jsonplaceholder.typicode.com/comments?_limit=6")
        .then(res => res.json())
        .then(data => {
          const container = document.getElementById("avis-container");

          data.forEach((comment, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4 mb-4 d-flex";

            const avatarUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;
            const fullName = comment.name;
            const email = comment.email;
            const body = comment.body;
            const rating = Math.floor(Math.random() * 2) + 4; // 4 ou 5 étoiles
            const starsHtml = "★".repeat(rating) + "☆".repeat(5 - rating);

            col.innerHTML = `
              <div class="avis-card">
                <div class="avis-header">
                  <img src="${avatarUrl}" alt="avatar" class="avatar">
                  <div>
                    <p class="avis-name">${fullName}</p>
                    <p class="avis-email">${email}</p>
                    <div class="stars">${starsHtml}</div>
                  </div>
                </div>
                <div class="avis-text">
                  "${body}"
                </div>
              </div>
            `;

            container.appendChild(col);
          });
        })
        .catch(err => {
          console.error("Erreur API :", err);
        });

});



//fonction qui affiche les details des services
function toggleDetails(button) {
    const details = button.nextElementSibling;
    if (details.style.display === "none" || details.style.display === "") {
      details.style.display = "block";
      button.textContent = "Voir moins";
    } else {
      details.style.display = "none";
      button.textContent = "Voir plus";
    }
  }

//fonction pour afficher une notification d'envoi de message de contact
const form = document.getElementById('contactForm');
const alertBox = document.getElementById('alertBox');

    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Empêche soumission par défaut

      if (form.checkValidity()) {
        // Si tous les champs sont valides
        showNotif("Merci pour votre message. Notre équipe vous contactera dans les plus brefs délais !", "success");
        form.reset(); // Réinitialise le formulaire
      } else {
        // Sinon, Bootstrap affiche automatiquement les erreurs
        form.classList.add('was-validated');
      }
    });

    function showNotif(message, type = "success") {
      alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show alert-animated" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"></button>
        </div>
      `;
    }
  
  

 
 