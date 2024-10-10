document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for fade-in effect on sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Form submission with animation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button[type="submit"]');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual AJAX call in production)
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Enviado';
                button.style.backgroundColor = '#28a745';
                setTimeout(() => {
                    button.innerHTML = 'Enviar';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    form.reset();
                }, 2000);
            }, 2000);
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 300px 0px"
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('button');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.classList.add('menu-toggle');
    document.querySelector('header .container').appendChild(menuToggle);

    const nav = document.querySelector('nav');
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Animate trainer cards on hover
    const trainerCards = document.querySelectorAll('.trainer-card');
    trainerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotate(2deg)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Countdown timer for a promotion (example)
    const countdownElement = document.createElement('div');
    countdownElement.id = 'countdown';
    countdownElement.classList.add('countdown');
    document.querySelector('#section1').appendChild(countdownElement);

    function updateCountdown() {
        const promotionEnd = new Date("2024-12-31T23:59:59").getTime();
        const now = new Date().getTime();
        const timeLeft = promotionEnd - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <h3>Oferta especial termina en:</h3>
            <div class="countdown-timer">
                <span>${days}d</span>
                <span>${hours}h</span>
                <span>${minutes}m</span>
                <span>${seconds}s</span>
            </div>
        `;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "<h3>¡La oferta ha terminado!</h3>";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
});