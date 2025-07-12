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

// i18n (Internationalization) System
const translations = {
    es: {
        nav: {
            about: "Quienes somos",
            pricing: "Precios",
            partnerships: "Convenios",
            blog: "Blog",
            download: "Descarga la App"
        },
        hero: {
            title: "Organiza tus apuntes sin esfuerzo",
            description: "Imagina una aplicación que, con solo una foto, clasifica automáticamente tus apuntes según el horario de tus clases. Captura, organiza y revisa tus notas de cada curso fácilmente.<br>¡Libérate del desorden y accede a tus fotos cuando más lo necesites!",
            cta: "Lo quiero"
        },
        video: {
            title: "Tecnología educativa para estudiantes organizados",
            paragraph1: "En la era digital, los dispositivos móviles se han convertido en aliados indispensables en el aprendizaje. Pero junto con su uso surge un reto: gestionar eficazmente la gran cantidad de información visual que los estudiantes recopilan en clase.",
            paragraph2: "Nuestra aplicación facilita este proceso al organizar automáticamente tus fotos según tu horario escolar.",
            paragraph3: "¡Conviértete en un estudiante más organizado, sin esfuerzo y con todo al alcance de tu mano con DiaLearn!"
        },
        features: {
            title: "¿Por qué elegir DiaLearn?",
            subtitle: "Descubre los beneficios que hacen de DiaLearn la mejor herramienta para organizar tu aprendizaje",
            feature1: {
                title: "Organización Automática por Horarios",
                description: "Nuestra IA clasifica automáticamente tus apuntes según tu horario académico. Sin esfuerzo manual, todos tus materiales estarán perfectamente organizados por asignatura y fecha."
            },
            feature2: {
                title: "Conversión Inteligente a Material Didáctico",
                description: "Transforma tus fotos de apuntes en material de estudio estructurado y fácil de revisar. La IA genera resúmenes, esquemas y contenido optimizado para tu aprendizaje."
            },
            feature3: {
                title: "Acceso Rápido cuando más lo Necesitas",
                description: "Encuentra tus apuntes al instante. Sistema de búsqueda inteligente que te permite localizar cualquier contenido por materia, fecha o tema específico en segundos."
            }
        },
        testimonials: {
            title: "Testimonios",
            cta: "No esperes más!"
        },
        download: {
            playstore: "Descargar nuestra app en Play Store",
            appstore: "O puedes descargarla en la App Store",
            step1: "Escanea el código QR",
            step2: "Descarga la aplicación en la app store",
            step3: "¡Disfruta al máximo de DiaLearn!"
        },
        about: {
            hero: {
                title: "Sobre Nosotros",
                subtitle: "EduNext: Pioneros en la revolución educativa",
                description: "Somos fervientes creyentes que el sector EdTech será pieza clave para la siguiente era de la educación. Estamos construyendo el futuro del aprendizaje, una innovación a la vez."
            },
            mission: {
                title: "Nuestra Misión",
                description: "Democratizar el acceso a herramientas educativas avanzadas mediante tecnología de vanguardia. Creamos soluciones que empoderan a estudiantes y educadores para alcanzar su máximo potencial, transformando la forma en que el mundo aprende y enseña."
            },
            vision: {
                title: "Nuestra Visión",
                description: "Ser la empresa líder mundial en innovación EdTech, estableciendo el estándar para la próxima generación de tecnologías educativas. Visualizamos un futuro donde cada estudiante tenga acceso a herramientas inteligentes que personalicen y optimicen su experiencia de aprendizaje."
            },
            story: {
                title: "Nuestra Historia",
                paragraph1: "EduNext nació de la convicción de que la educación tradicional necesitaba una transformación radical. Fundada por un equipo de visionarios en tecnología y educación, nuestra startup se estableció con el objetivo audaz de redefinir cómo las personas aprenden en la era digital.",
                paragraph2: "Desde nuestros inicios, hemos estado comprometidos con la creación de soluciones que no solo resuelvan problemas actuales, sino que anticipen las necesidades futuras del sector educativo. DiaLearn es nuestra primera manifestación de esta visión: una aplicación que utiliza inteligencia artificial para transformar la experiencia de estudio.",
                stat1: "Año de fundación",
                stat2: "Profesionales expertos",
                stat3: "Estudiantes impactados"
            },
            values: {
                title: "Nuestros Valores",
                subtitle: "Los principios que guían cada decisión y acción en EduNext",
                value1: {
                    title: "Innovación Continua",
                    description: "Nos comprometemos a estar siempre a la vanguardia tecnológica, desarrollando soluciones que marquen la diferencia en el sector educativo."
                },
                value2: {
                    title: "Educación Accesible",
                    description: "Creemos que toda persona merece acceso a herramientas educativas de calidad, sin importar su contexto socioeconómico o ubicación geográfica."
                },
                value3: {
                    title: "Excelencia Técnica",
                    description: "Mantenemos los más altos estándares de calidad en cada línea de código, cada diseño y cada experiencia de usuario que creamos."
                },
                value4: {
                    title: "Colaboración",
                    description: "Fomentamos el trabajo en equipo, tanto internamente como con nuestros usuarios, para co-crear soluciones que realmente transformen vidas."
                }
            },
            cta: {
                title: "¿Listo para ser parte del futuro de la educación?",
                description: "Únete a miles de estudiantes que ya están transformando su forma de aprender con DiaLearn. El futuro de la educación comienza ahora.",
                primary: "Conoce DiaLearn",
                secondary: "Contáctanos"
            }
        }
    },
    en: {
        nav: {
            about: "About Us",
            pricing: "Pricing",
            partnerships: "Partnerships",
            blog: "Blog",
            download: "Download App"
        },
        hero: {
            title: "Organize your notes effortlessly",
            description: "Imagine an app that, with just one photo, automatically classifies your notes according to your class schedule. Capture, organize, and review your notes from each course easily.<br>Free yourself from clutter and access your photos when you need them most!",
            cta: "I want it"
        },
        video: {
            title: "Educational technology for organized students",
            paragraph1: "In the digital age, mobile devices have become indispensable allies in learning. But along with their use comes a challenge: effectively managing the large amount of visual information that students collect in class.",
            paragraph2: "Our application facilitates this process by automatically organizing your photos according to your school schedule.",
            paragraph3: "Become a more organized student, effortlessly and with everything at your fingertips with DiaLearn!"
        },
        features: {
            title: "Why choose DiaLearn?",
            subtitle: "Discover the benefits that make DiaLearn the best tool to organize your learning",
            feature1: {
                title: "Automatic Organization by Schedules",
                description: "Our AI automatically classifies your notes according to your academic schedule. Without manual effort, all your materials will be perfectly organized by subject and date."
            },
            feature2: {
                title: "Smart Conversion to Educational Material",
                description: "Transform your note photos into structured and easy-to-review study material. AI generates summaries, diagrams and content optimized for your learning."
            },
            feature3: {
                title: "Quick Access When You Need It Most",
                description: "Find your notes instantly. Smart search system that allows you to locate any content by subject, date or specific topic in seconds."
            }
        },
        testimonials: {
            title: "Testimonials",
            cta: "Don't wait any longer!"
        },
        download: {
            playstore: "Download our app on Play Store",
            appstore: "Or you can download it on the App Store",
            step1: "Scan the QR code",
            step2: "Download the app from the app store",
            step3: "Enjoy DiaLearn to the fullest!"
        },
        about: {
            hero: {
                title: "About Us",
                subtitle: "EduNext: Pioneers in the educational revolution",
                description: "We are fervent believers that the EdTech sector will be a key piece for the next era of education. We are building the future of learning, one innovation at a time."
            },
            mission: {
                title: "Our Mission",
                description: "Democratize access to advanced educational tools through cutting-edge technology. We create solutions that empower students and educators to reach their full potential, transforming the way the world learns and teaches."
            },
            vision: {
                title: "Our Vision",
                description: "To be the world's leading company in EdTech innovation, setting the standard for the next generation of educational technologies. We envision a future where every student has access to intelligent tools that personalize and optimize their learning experience."
            },
            story: {
                title: "Our Story",
                paragraph1: "EduNext was born from the conviction that traditional education needed a radical transformation. Founded by a team of visionaries in technology and education, our startup was established with the bold goal of redefining how people learn in the digital age.",
                paragraph2: "Since our beginnings, we have been committed to creating solutions that not only solve current problems, but anticipate the future needs of the education sector. DiaLearn is our first manifestation of this vision: an application that uses artificial intelligence to transform the study experience.",
                stat1: "Year founded",
                stat2: "Expert professionals",
                stat3: "Students impacted"
            },
            values: {
                title: "Our Values",
                subtitle: "The principles that guide every decision and action at EduNext",
                value1: {
                    title: "Continuous Innovation",
                    description: "We commit to always being at the technological forefront, developing solutions that make a difference in the education sector."
                },
                value2: {
                    title: "Accessible Education",
                    description: "We believe that every person deserves access to quality educational tools, regardless of their socioeconomic context or geographic location."
                },
                value3: {
                    title: "Technical Excellence",
                    description: "We maintain the highest quality standards in every line of code, every design, and every user experience we create."
                },
                value4: {
                    title: "Collaboration",
                    description: "We foster teamwork, both internally and with our users, to co-create solutions that truly transform lives."
                }
            },
            cta: {
                title: "Ready to be part of the future of education?",
                description: "Join thousands of students who are already transforming their way of learning with DiaLearn. The future of education begins now.",
                primary: "Discover DiaLearn",
                secondary: "Contact Us"
            }
        }
    }
};

// i18n functionality
class I18n {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'es';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateLanguage(this.currentLanguage);
        this.updateUI();
    }

    setupEventListeners() {
        // Desktop language toggle
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', () => {
                languageDropdown.classList.remove('show');
            });
        }

        // Language option buttons (both desktop and mobile)
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                this.changeLanguage(lang);
            });
        });
    }

    changeLanguage(lang) {
        if (this.currentLanguage !== lang) {
            this.currentLanguage = lang;
            localStorage.setItem('language', lang);
            this.updateLanguage(lang);
            this.updateUI();
            
            // Close dropdown
            const dropdown = document.getElementById('language-dropdown');
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        }
    }

    updateLanguage(lang) {
        // Update all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getNestedValue(translations[lang], key);
            
            if (translation) {
                // Add fade effect
                element.classList.add('fade-transition');
                
                setTimeout(() => {
                    element.innerHTML = translation;
                    element.classList.add('show');
                }, 150);
                
                setTimeout(() => {
                    element.classList.remove('fade-transition');
                }, 300);
            }
        });
    }

    updateUI() {
        // Update current language display
        const currentLangElement = document.getElementById('current-lang');
        if (currentLangElement) {
            currentLangElement.textContent = this.currentLanguage.toUpperCase();
        }

        // Update active states
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLanguage;
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }
}

// Initialize i18n system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new I18n();
});