document.addEventListener('DOMContentLoaded', () => {
    // Inicializar GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Navegación y menú móvil
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });

    // Cambiar estilo del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Resaltar elemento de navegación activo
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(item => {
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('section[id]').forEach((section) => {
        observer.observe(section);
    });

    // Animaciones con GSAP
    gsap.from('.hero h1', { opacity: 0, y: 50, duration: 1, ease: 'power3.out' });
    gsap.from('.hero p', { opacity: 0, y: 50, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero .cta-button', { opacity: 0, y: 50, duration: 1, delay: 0.6, ease: 'power3.out' });

    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
            },
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.2
        });
    });

    // Animación del formulario de contacto
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        gsap.to(form, { opacity: 0, y: -50, duration: 0.5, ease: 'power3.out' });
        setTimeout(() => {
            form.reset();
            gsap.to(form, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
        }, 1000);
    });
});