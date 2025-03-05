// Smooth scroll for navigation links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
});

//CURSOR ---------------------------------------------------
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Select interactive elements
const interactiveElements = document.querySelectorAll('.btn, .nav-links a, .contact-item a, .project-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});


//NAVBAR ---------------------------------------------------
let lastScrollTop = 0; // Keep track of last scroll position
const navbar = document.querySelector('.navbar'); // Select the navbar

// Detect scroll event
window.addEventListener('scroll', function () {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Check scroll direction
    if (currentScroll > lastScrollTop) {
        // Scrolling down: hide navbar
        navbar.style.transform = 'translateY(-100%)'; 
    } else {
        // Scrolling up: show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    // Update last scroll position
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});

// Observe multiple sections
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('dark-section')) {
                navbar.classList.add('on-dark-section'); // Add class for dark sections
            } else {
                navbar.classList.remove('on-dark-section'); // Remove class if not in a dark section
            }
        }
    });
}, { threshold: 0.5 });

// Attach observer to all sections
document.querySelectorAll('.section').forEach(section => observer.observe(section));

v

