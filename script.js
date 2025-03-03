// Menu Toggle for Mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
};

// Smooth Scrolling for Navbar Links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        navbar.classList.remove('active'); // Close menu after clicking
    });
});

// Typing Effect for Home Section
const typingText = document.querySelector('.typing-text span');
const professions = ['Software Developer', 'Cybersecurity Expert', 'AI Enthusiast'];
let professionIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < professions[professionIndex].length) {
        typingText.textContent += professions[professionIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = professions[professionIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        professionIndex = (professionIndex + 1) % professions.length;
        setTimeout(type, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000); // Start typing after 1 second
});

// Fade-In Animation on Scroll
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('hidden'); // Initially hidden
    observer.observe(section);
});

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (name.length < 2) {
            alert('Please enter a valid name (at least 2 characters).');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters.');
            return;
        }

        alert('Message sent successfully! Thank you for reaching out.');
        this.reset(); // Clear form after submission
    });
}

// Dynamic Year in Footer
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = `© ${currentYear} Eng Mohamed Samir. All Rights Reserved.`;
}

// Enhance Button Hover Effects with Ripple
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const x = e.clientX - this.getBoundingClientRect().left;
        const y = e.clientY - this.getBoundingClientRect().top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});

// Hire Me Popup
const hireMeBtn = document.getElementById('hire-me-btn');
const hireMePopup = document.getElementById('hire-me-popup');
const closePopup = document.getElementById('close-popup');
const hireForm = document.getElementById('hire-form');

hireMeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hireMePopup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
    hireMePopup.style.display = 'none';
});

// Close popup when clicking outside
hireMePopup.addEventListener('click', (e) => {
    if (e.target === hireMePopup) {
        hireMePopup.style.display = 'none';
    }
});

// Form Submission
hireForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = hireForm.querySelector('input[type="text"]').value.trim();
    const email = hireForm.querySelector('input[type="email"]').value.trim();
    const details = hireForm.querySelector('textarea').value.trim();

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || details.length < 10) {
        alert('Please fill out all fields correctly.');
        return;
    }

    alert('Thank you, ' + name + '! Your request has been submitted.');
    hireForm.reset();
    hireMePopup.style.display = 'none';
});