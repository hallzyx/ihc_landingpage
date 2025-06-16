const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    // Alterna una clase 'show' para mostrar u ocultar el menú
    // El estado inicial es 'display: none' en el CSS
    mobileMenu.classList.toggle('show');
});

// Testimonials carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!track || !prevBtn || !nextBtn || cards.length === 0) {
        return; // Si no existen los elementos, salir
    }
    
    let currentIndex = 0;
    const totalCards = cards.length;
    const cardsToShow = 3; // Siempre mostrar exactamente 3 cards
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // Gap entre cards
        const offset = currentIndex * (cardWidth + gap);
        
        track.style.transform = `translateX(-${offset}px)`;
        
        // Actualizar estado de botones
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalCards - cardsToShow;
        
        // Agregar clases de estado
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.4';
        } else {
            prevBtn.style.opacity = '1';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.4';
        } else {
            nextBtn.style.opacity = '1';
        }
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalCards - cardsToShow) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Inicializar carrusel
    updateCarousel();
    
    // Actualizar en resize
    window.addEventListener('resize', function() {
        // Resetear índice si es necesario
        if (currentIndex >= totalCards - cardsToShow) {
            currentIndex = Math.max(0, totalCards - cardsToShow);
        }
        updateCarousel();
    });
});