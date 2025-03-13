// Función para inicializar el proyecto
document.addEventListener('DOMContentLoaded', () => {
    // Animaciones y efectos
    initAnimations();
    
    // Control del Navbar
    initNavbarBehavior();
    
    // Contador de estadísticas
    initStatCounters();
    
    // Sistema de compromisos
    initPledgeSystem();
    
    // Validaciones y interacciones
    initFormValidations();
});

// Animaciones y efectos de scroll
function initAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Control del comportamiento del Navbar
function initNavbarBehavior() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar.offsetHeight;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Ocultar navbar al bajar
        if (scrollTop > lastScrollTop && scrollTop > navHeight) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Contador de estadísticas animado
function initStatCounters() {
    const statsElements = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target) => {
        const duration = 2000; // Duración de la animación en ms
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(target * progress);
            
            element.textContent = currentValue;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = target;
            }
        }, frameDuration);
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsElements.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Sistema de compromisos
function initPledgeSystem() {
    const pledgeForm = document.getElementById('enviar-compromiso');
    const pledgeInput = document.getElementById('compromiso');
    const nameInput = document.getElementById('nombre');
    const totalCompromisosElement = document.getElementById('total-compromisos');

    // Cargar compromisos del localStorage
    let compromisos = JSON.parse(localStorage.getItem('compromisos')) || [];
    totalCompromisosElement.textContent = compromisos.length;

    pledgeForm.addEventListener('click', () => {
        const compromiso = pledgeInput.value.trim();
        const nombre = nameInput.value.trim();

        if (compromiso && nombre) {
            // Guardar compromiso
            compromisos.push({
                nombre,
                compromiso,
                fecha: new Date().toLocaleString()
            });

            // Actualizar localStorage
            localStorage.setItem('compromisos', JSON.stringify(compromisos));

            // Actualizar contador
            totalCompromisosElement.textContent = compromisos.length;

            // Limpiar inputs
            pledgeInput.value = '';
            nameInput.value = '';

            // Mostrar mensaje de éxito
            alert('¡Gracias por tu compromiso!');
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
}

// Validaciones de formularios
function initFormValidations() {
    // Validaciones generales (puedes expandirlas)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Validaciones personalizadas
            validateForm(form);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        // Validación básica
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Opcional: Modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
}

// Inicializar modo oscuro guardado
function initDarkMode() {
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
}
