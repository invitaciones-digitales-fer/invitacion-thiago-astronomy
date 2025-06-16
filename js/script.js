// Variables globales
let musicPlaying = false;
let currentGalleryIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeOverlay();
    initializeMusicControl();
    initializeCountdown();
    initializeInteractivePlanets();
    initializeGallery();
    initializeRSVP();
    initializeScrollAnimations();
    addStarClickEffect();
});

// Manejo del overlay de bienvenida
function initializeOverlay() {
    const startBtn = document.getElementById('startJourney');
    const overlay = document.getElementById('welcomeOverlay');
    const mainContent = document.getElementById('mainContent');
    const musicControl = document.getElementById('musicControl');
    
    startBtn.addEventListener('click', function() {
        // Animación de salida del overlay
        overlay.style.transition = 'opacity 1s ease, transform 1s ease';
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            musicControl.classList.remove('hidden');
            
            // Activar música de fondo
            const bgMusic = document.getElementById('backgroundMusic');
            if (bgMusic) {
                bgMusic.play().catch(e => {
                    console.log('No se pudo reproducir la música automáticamente');
                });
                musicPlaying = true;
                updateMusicIcon();
            }
            
            // Inicializar animaciones del contenido principal
            initializeMainContentAnimations();
        }, 1000);
        
        // Efecto de partículas
        createParticleExplosion(startBtn);
    });
}

// Animaciones del contenido principal
function initializeMainContentAnimations() {
    // Animar elementos del hero
    const logo = document.querySelector('.logo');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const planets = document.querySelectorAll('.floating-planets .planet');
    
    // Animaciones secuenciales
    setTimeout(() => {
        logo.style.animation = 'slideInDown 1s ease-out';
    }, 100);
    
    setTimeout(() => {
        heroTitle.style.animation = 'titleBounce 1s ease-out';
    }, 300);
    
    setTimeout(() => {
        heroSubtitle.style.animation = 'fadeIn 1s ease-out';
    }, 600);
    
    setTimeout(() => {
        planets.forEach((planet, index) => {
            planet.style.animation = `fadeInScale 0.8s ease-out ${index * 0.2}s both`;
        });
    }, 900);
}

// Control de música
function initializeMusicControl() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('backgroundMusic');
    
    musicToggle.addEventListener('click', function() {
        if (musicPlaying) {
            bgMusic.pause();
            musicPlaying = false;
        } else {
            bgMusic.play().catch(e => {
                console.log('Error al reproducir música:', e);
            });
            musicPlaying = true;
        }
        updateMusicIcon();
        
        // Animación del botón
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

function updateMusicIcon() {
    const musicIcon = document.querySelector('.music-icon');
    musicIcon.textContent = musicPlaying ? '🎵' : '🔇';
}

// Cuenta regresiva
function initializeCountdown() {
    let eventDate = new Date("2025-11-22T15:00:00").getTime(); // Fecha objetivo

    function updateCountdown() {
        let now = new Date().getTime(); // Tiempo actual
        let timeLeft = eventDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdownInterval); // Detiene la cuenta al llegar a 0
            document.getElementById("countdown").innerHTML = '<p class="countdown-message">¡Es hora de la fiesta! 🚀🎉</p>';
            return;
        }

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days.toString().padStart(2, "0");
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
    }

    updateCountdown(); // Ejecutar la actualización de inmediato
    let countdownInterval = setInterval(updateCountdown, 1000); // Actualizar cada segundo
}
document.getElementById('startJourney').addEventListener('click', function() {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.3; // El volumen va de 0.0 (silencio) a 1.0 (máximo)


    // Verificar si el archivo está cargado antes de reproducirlo
    audio.load();

    audio.play().then(() => {
        console.log("Música iniciada correctamente.");
    }).catch(error => {
        console.error("Error al reproducir música:", error);
    });
});







// Planetas interactivos
function initializeInteractivePlanets() {
    const planetOptions = document.querySelectorAll('.planet-option');
    const planetMessage = document.getElementById('planetMessage');
    
    const planetMessages = {
        mars: '¡Genial! En Marte podremos explorar volcanes gigantes y buscar agua congelada. 🔴',
        jupiter: '¡Increíble! En Júpiter veremos la Gran Mancha Roja y sus lunas heladas. 🟠',
        saturn: '¡Fantástico! En Saturno navegaremos entre sus hermosos anillos de hielo. 🪐'
    };
    
    planetOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remover selección anterior
            planetOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Seleccionar planeta actual
            this.classList.add('selected');
            
            // Mostrar mensaje
            const planet = this.dataset.planet;
            planetMessage.textContent = planetMessages[planet];
            planetMessage.classList.remove('hidden');
            
            // Animación del planeta seleccionado
            const planetVisual = this.querySelector('.planet-visual');
            planetVisual.style.transform = 'scale(1.2)';
            setTimeout(() => {
                planetVisual.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// Galería de fotos
function initializeGallery() {
    const galleryTrack = document.querySelector('.gallery-track');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const totalItems = document.querySelectorAll('.gallery-item').length;
    
    function updateGallery() {
        const translateX = -currentGalleryIndex * 100;
        galleryTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    nextBtn.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
        updateGallery();
        
        // Animación del botón
        this.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
    
    prevBtn.addEventListener('click', function() {
        currentGalleryIndex = (currentGalleryIndex - 1 + totalItems) % totalItems;
        updateGallery();
        
        // Animación del botón
        this.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
    
    // Auto-play de la galería
    setInterval(() => {
        currentGalleryIndex = (currentGalleryIndex + 1) % totalItems;
        updateGallery();
    }, 5000);
}

// RSVP Form
function initializeRSVP() {
    const rsvpForm = document.getElementById('rsvpForm');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const guestName = formData.get('guestName');
        const attendance = formData.get('attendance');
        const message = formData.get('message') || '';
        
        // Validación
        if (!guestName || !attendance) {
            showToast('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Crear mensaje para WhatsApp
        const attendanceText = {
            'si': '¡Sí, estaré allí! 🌟',
            'no': 'No podré asistir 😢',
            'maybe': 'Tal vez pueda ir 🤔'
        };
        
        let whatsappMessage = `🚀 *CONFIRMACIÓN PARA EL CUMPLE DE THIAGO* 🚀\n\n`;
        whatsappMessage += `👨‍🚀 Astronauta: ${guestName}\n`;
        whatsappMessage += `🛸 Asistencia: ${attendanceText[attendance]}\n`;
        
        if (message) {
            whatsappMessage += `💫 Mensaje: ${message}\n`;
        }
        
        whatsappMessage += `\n¡Nos vemos en la galaxia fiesta! 🌟`;
        
        // Abrir WhatsApp
        const phoneNumber = '5491234567890'; // Reemplazar con el número real
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
        
        // Mostrar toast de confirmación
        showToast('¡Listo, nos vemos en la estación espacial!', 'success');
        
        // Resetear formulario
        this.reset();
        
        // Animación de éxito
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.style.transform = 'scale(1.1)';
        submitBtn.style.backgroundColor = '#caff00';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
            submitBtn.style.backgroundColor = '';
        }, 300);
    });
}

// Animaciones de scroll
function initializeScrollAnimations() {
    // Observador de intersección para animaciones de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Observar cards de detalles
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach((card, index) => {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
                    }, index * 200);
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
}

// Funciones utilitarias
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    toastMessage.textContent = message;
    toastIcon.textContent = type === 'success' ? '🚀' : '⚠️';
    
    toast.classList.remove('hidden');
    
    // Auto-hide después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 500);
    }, 3000);
}

function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #00f0ff, #9d4edd);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        
        document.body.appendChild(particle);
        
        // Animación de partícula
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 100 + Math.random() * 100;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(particle);
        };
    }
}

// Función para abrir el mapa
function openMap() {
    const address = "Av. Las Galaxias 123, Ciudad Estelar";
    const mapUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
    window.open(mapUrl, '_blank');
    
    // Animación del botón
    event.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
        event.target.style.transform = 'scale(1)';
    }, 150);
}

// Efectos adicionales para mejorar la experiencia
function addStarClickEffect() {
    document.addEventListener('click', function(e) {
        // Crear estrella en el punto de clic
        const star = document.createElement('div');
        star.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 20px;
            height: 20px;
            color: #00f0ff;
            font-size: 20px;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;
        star.textContent = '✨';
        
        document.body.appendChild(star);
        
        // Animación de estrella
        star.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(1.5) rotate(360deg)', opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            document.body.removeChild(star);
        };
    });
}