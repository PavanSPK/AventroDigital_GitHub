// Main JavaScript for Aventro Digital Website

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Create floating particles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 24 + 12;
    particle.style.width = particle.style.height = size + 'px';
    particle.style.opacity = Math.random() * 0.2 + 0.1;
    particle.style.animationDuration = (Math.random() * 8 + 12) + 's';
    document.querySelector('.hero').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 20000);
}

setInterval(createParticle, 400);

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const isLight = document.body.classList.contains('light-mode');
    if (window.scrollY > 100) {
        if (isLight) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            header.style.color = '#333';
        } else {
            header.style.background = 'rgba(35, 41, 70, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
            header.style.color = '#fff';
        }
    } else {
        if (isLight) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
            header.style.color = '#333';
        } else {
            header.style.background = 'rgba(35, 41, 70, 0.95)';
            header.style.boxShadow = 'none';
            header.style.color = '#fff';
        }
    }
});

// Responsive menu toggle
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');
menuIcon.addEventListener('click', function() {
    if (navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        setTimeout(() => {
            navLinks.style.display = '';
        }, 300);
    } else {
        navLinks.style.display = 'flex';
        setTimeout(() => {
            navLinks.classList.add('open');
        }, 10);
    }
});
// Close menu when a link is clicked (mobile UX)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        setTimeout(() => {
            navLinks.style.display = '';
        }, 300);
    });
});

// Theme toggle button logic
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
themeToggle.innerHTML = '<span id="theme-icon">🌙</span>';
document.body.appendChild(themeToggle);

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        document.getElementById('theme-icon').textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.getElementById('theme-icon').textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme');
setTheme(savedTheme === 'light');

themeToggle.addEventListener('click', () => {
    const isLight = !document.body.classList.contains('light-mode');
    setTheme(isLight);
});
