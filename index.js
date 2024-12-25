const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const typedTextElement = document.querySelector('.typed-text');
    const phrases = ['Professional Brand', 'Career Story', 'Resume Excellence'];
    let currentPhrase = 0;
    let currentCharacter = 0;
    let isDeleting = false;

    function type() {
        const fullPhrase = phrases[currentPhrase];
        let currentText = isDeleting
            ? fullPhrase.slice(0, currentCharacter - 1)
            : fullPhrase.slice(0, currentCharacter + 1);

        typedTextElement.textContent = currentText;

        if (!isDeleting && currentText === fullPhrase) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }

        currentCharacter += isDeleting ? -1 : 1;
        setTimeout(type, isDeleting ? 50 : 150);
    }

    type();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

const swiper = new Swiper('.testimonials-slider', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});