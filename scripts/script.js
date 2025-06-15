const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            // Alterna una clase 'show' para mostrar u ocultar el menú
            // El estado inicial es 'display: none' en el CSS
            mobileMenu.classList.toggle('show');
        });