document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in animation helper
    const animateElements = document.querySelectorAll('.card, .text-content, .visual-content, .section-header');
    
    // Add base transition styles via JS to keep CSS clean(er) or assume CSS handles opacity
    const style = document.createElement('style');
    style.innerHTML = `
        .card, .text-content, .visual-content, .section-header {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    animateElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 25, 47, 0.95)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
        } else {
            navbar.style.background = 'rgba(10, 25, 47, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});
