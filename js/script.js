document.addEventListener('DOMContentLoaded', function () {
 /*  // ScrollReveal animations
  ScrollReveal().reveal('#history', { origin: 'left', distance: '50px', duration: 1000, easing: 'ease-in-out' });
  ScrollReveal().reveal('#vision', { origin: 'right', distance: '50px', duration: 1000, easing: 'ease-in-out' });
  ScrollReveal().reveal('#expertises', { origin: 'bottom', distance: '40px', duration: 1000, easing: 'ease-in-out', delay: 200 });
  ScrollReveal().reveal('#whyus', { origin: 'bottom', distance: '40px', duration: 1000, easing: 'ease-in-out', delay: 400 });
  ScrollReveal().reveal('#stats', { scale: 0.8, duration: 1000, easing: 'ease-in-out', delay: 600 });
  ScrollReveal().reveal('#cta', { opacity: 0, duration: 1000, easing: 'ease-in-out', delay: 800 }); */

  // Redirection au clic sur le lien dropdown
  var dropdownLink = document.getElementById('dropdown07');
  if (dropdownLink) {
    dropdownLink.addEventListener('click', function (e) {
      // Aller directement sur la page services.html
      window.location.href = this.href;
    });
  }
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