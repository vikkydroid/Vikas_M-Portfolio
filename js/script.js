// ==============================
// Typing Effect Setup
// ==============================
const typingText = document.querySelector('.typing');
const words = ['I\'m Vikas', 'Am a Software Developer', 'Am a RPA Specialist', 'Am a Problem Solver'];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.substring(0, charIndex);

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(typeEffect, 1000);
  }
}
typeEffect();


// ==============================
// DOM Loaded: Section Reveal & Navigation Active State
// ==============================
window.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const navItem = document.querySelector(`.nav-link[href="#${id}"]`);

        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          if (navItem) navItem.classList.add('active');
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback for older browsers
    sections.forEach(section => section.classList.add('visible'));
  }
});


// ==============================
// Navbar Scroll Shadow
// ==============================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});


// ==============================
// Mobile Menu Toggle
// ==============================
const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle && navLinksContainer) {
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-show');
  });

  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinksContainer.classList.remove('mobile-show');

      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}


// ==============================
// Contact Form Submission
// ==============================
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
}


// ==============================
// Dark Mode Toggle
// ==============================
const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (darkModeToggle) {
  // Initial load from localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}
