// ==============================
// Typing Effect Setup
// ==============================

const typingText = document.querySelector('.typing');
const words = ["I'm Vikas", 'Am a Software Developer', 'Am a RPA Specialist', 'Am a Problem Solver'];
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
// Section Reveal & Navigation Highlight on Scroll
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
          // Remove active class from all links and apply to the current one
          navLinks.forEach(link => link.classList.remove('active'));
          if (navItem) navItem.classList.add('active');
          entry.target.classList.add('visible'); // Reveal section
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback for browsers that don’t support IntersectionObserver
    sections.forEach(section => section.classList.add('visible'));
  }
});


// ==============================
// Navbar Shadow on Scroll
// ==============================

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});


// ==============================
// Mobile Navigation Toggle
// ==============================

const navToggle = document.querySelector('.nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (navToggle && navLinksContainer) {
  navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-show');
  });

  // Smooth scroll and auto-close mobile nav on link click
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
// Contact Form Submission Handler
// ==============================

const form = document.getElementById('contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation check
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Simulated success feedback
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
}


// ==============================
// Dark Mode Toggle & Persistence
// ==============================

const darkModeToggle = document.querySelector('.dark-mode-toggle');

if (darkModeToggle) {
  // Set theme from localStorage on initial load
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }

  // Toggle dark mode and save preference
  darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
  });
}


// ==============================
// Optional Enhancement: Scroll to Top Button (Bonus)
// ==============================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-top-btn';
scrollToTopBtn.textContent = 'Scroll to top ⬆';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

// Show/hide button based on scroll
window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Smooth scroll to top on click
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

