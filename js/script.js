// Fonctionnalités principales du portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Animations au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une fois au chargement
    
    // Filtrage des projets
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Gestion du téléchargement de photo
    const photoUpload = document.getElementById('photo-upload');
    const photoPreview = document.getElementById('photo-preview');
    
    if (photoUpload && photoPreview) {
        photoUpload.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    photoPreview.src = reader.result;
                    
                    // Stocker l'image dans le localStorage pour la persistance
                    localStorage.setItem('portfolioProfilePhoto', reader.result);
                });
                
                reader.readAsDataURL(file);
            }
        });
        
        // Charger la photo depuis le localStorage si disponible
        const savedPhoto = localStorage.getItem('portfolioProfilePhoto');
        if (savedPhoto) {
            photoPreview.src = savedPhoto;
        }
    }
    
    // Gestion des projets à venir
    const addProjectForm = document.getElementById('add-project-form');
    
    if (addProjectForm) {
        addProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const projectTitle = document.getElementById('project-title').value;
            const projectDescription = document.getElementById('project-description').value;
            const projectStatus = document.getElementById('project-status').value;
            
            if (projectTitle && projectDescription) {
                // Créer un nouvel élément de projet
                const futureProjectsContainer = document.querySelector('.future-projects-container');
                
                if (futureProjectsContainer) {
                    const newProjectCard = document.createElement('div');
                    newProjectCard.className = 'future-project-card animate-on-scroll animated';
                    
                    // Déterminer l'icône en fonction du statut
                    let icon = 'lightbulb';
                    if (projectStatus === 'Planifié') icon = 'calendar-alt';
                    if (projectStatus === 'En développement') icon = 'code';
                    
                    newProjectCard.innerHTML = `
                        <div class="future-project-icon">
                            <i class="fas fa-${icon}"></i>
                        </div>
                        <div class="future-project-content">
                            <h3 class="future-project-title">${projectTitle}</h3>
                            <p class="future-project-description">${projectDescription}</p>
                            <span class="future-project-status">${projectStatus}</span>
                        </div>
                    `;
                    
                    futureProjectsContainer.appendChild(newProjectCard);
                    addProjectForm.reset();
                    
                    // Afficher un message de succès
                    alert('Projet ajouté avec succès !');
                }
            }
        });
    }
    
    // Prévisualisation du CV
    const downloadButtons = document.querySelectorAll('.download-button');
    const cvPreviewFrame = document.getElementById('cv-preview-frame');
    
    if (downloadButtons.length > 0 && cvPreviewFrame) {
        downloadButtons.forEach(button => {
            button.addEventListener('mouseover', function() {
                const previewUrl = this.getAttribute('data-preview');
                if (previewUrl) {
                    cvPreviewFrame.src = previewUrl;
                }
            });
        });
    }
    
    // Formulaire de contact
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // Simuler l'envoi du formulaire
                alert(`Merci ${name} ! Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.`);
                contactForm.reset();
            }
        });
    }
    
    // Fonction pour créer une nouvelle page (utilisée dans add-page.html)
    window.createNewPage = function() {
        const pageTitle = document.getElementById('page-title');
        const pageContent = document.getElementById('page-content');
        
        if (pageTitle && pageContent && pageTitle.value && pageContent.innerHTML) {
            // Dans une application réelle, cela créerait un nouveau fichier HTML
            alert(`La page "${pageTitle.value}" a été créée avec succès !`);
        } else {
            alert('Veuillez remplir tous les champs requis.');
        }
    };
});
