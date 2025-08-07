document.addEventListener('DOMContentLoaded', function () {
// Redirection au clic sur le lien dropdown
  var dropdownLink = document.getElementById('dropdown07');
  if (dropdownLink) {
    dropdownLink.addEventListener('click', function (e) {
      // Aller directement sur la page services.html
      window.location.href = this.href;
    });
  }


//scrollReveal
  ScrollReveal().reveal('.sr', { //scroll reveal from the bottom
    origin: 'bottom',    // ou 'top', 'left', 'right'
    distance: '40px',
    duration: 1000,
    delay: 100,
    interval: 200,
    easing: 'ease-out',
    reset: false         
  });
  ScrollReveal().reveal('.main_part2 > .sr', { //scroll reveal from the bottom
    origin: 'bottom',
    distance: '40px',
    duration: 1000,
    interval: 150,
    easing: 'ease-out',
    reset: false
  });
  ScrollReveal().reveal('.sr2', { //scroll reveal from the left
    origin: 'left',
    distance: '40px',
    duration: 1000,
    interval: 150,
    easing: 'ease-out',
    reset: false
  });
  ScrollReveal().reveal('.sr3', { //scroll reveal from the right
    origin: 'right',
    distance: '40px',
    duration: 1000,
    interval: 150,
    easing: 'ease-out',
    reset: false
  });

//Compteur qui defile pour les chiffres 
const counters = document.querySelectorAll('.counter');
  const options = {
    threshold: 0.6
  };

  const startCounter = (entry) => {
    const counter = entry.target;
    const target = +counter.getAttribute('data-target');
    const isPercent = counter.textContent.includes('%');
    let count = 0;
    const duration = 4000; // en ms
    const increment = target / (duration / 20); // 20 ms par incrément

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.floor(count) + (isPercent ? '%' : '');
        setTimeout(updateCount, 20);
      } else {
        counter.textContent = target + (isPercent ? '%' : '');
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry);
        obs.unobserve(entry.target); // Pour ne le faire qu'une seule fois
      }
    });
  }, options);

  counters.forEach(counter => observer.observe(counter));  

//API pour les membres de l'equipe
  function getRandomRole(i) {
    const roles = [
      "CEO & Expert en SEO",
      "Responsable RH",
      "Responsable Marketing",
      "Developpeur SEO Senior",
      "UX Designer",
      "Service Client"
    ];
    return roles[i];
  }

  fetch("https://randomuser.me/api/?results=6&nat=fr")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("teamContainer");
    let i=0;
    data.results.forEach(user => {
      const fullName = `${user.name.first} ${user.name.last}`;
      const role = getRandomRole(i); 
      const image = user.picture.large;

      const card = document.createElement("div");
      card.className = "card-v2";
      card.style.backgroundImage = `url('${image}')`;
      card.style.backgroundSize = "cover";
      card.style.backgroundPosition = "center";

      card.innerHTML = `
        <div class="card-content text-center">
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


//animation vanta pour le background
let vantaEffect;

  window.onload = () => {
    vantaEffect = VANTA.NET({
      el: document.body,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xff1b1b,
      backgroundColor: 0x0,
      points: 8.00,
      spacing: 16.00
    });

    // Correction erreur de dimension
    setTimeout(() => {
      if (vantaEffect && vantaEffect.resize) {
        vantaEffect.resize();
      }
    }, 100);
  };

  window.addEventListener('resize', () => {
    if (vantaEffect && vantaEffect.resize) {
      vantaEffect.resize();
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
  
  
 // Fonction d'interaction de la page d'accueil
  function setActive(element) {
    document.querySelectorAll('.step-box').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
  }
 
 