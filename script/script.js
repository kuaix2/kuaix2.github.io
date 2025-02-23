// Horizontal scroll handling
const main = document.querySelector('main');
let currentSection = 0;
const sections = document.querySelectorAll('.section');

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetIndex = Array.from(sections).findIndex(section => section.id === targetId);
        if (targetIndex !== -1) {
            currentSection = targetIndex;
            main.style.transform = `translateX(-${currentSection * 100}vw)`;
        }
    });
});

// Add debounce for wheel scroll
let isScrolling = false;

// Handle wheel scroll with debounce
document.addEventListener('wheel', (e) => {
    if (!isScrolling) {
        isScrolling = true;
        
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
            main.style.transform = `translateX(-${currentSection * 100}vw)`;
        } else if (e.deltaY < 0 && currentSection > 0) {
            currentSection--;
            main.style.transform = `translateX(-${currentSection * 100}vw)`;
        }
        
        // Wait for animation to complete before allowing next scroll
        setTimeout(() => {
            isScrolling = false;
        }, 1200); // Match this with the CSS transition duration
    }
}, { passive: false });

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;

// Remove or comment out this scroll listener since we want full transparency
/*
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.background = scrollTop > 50 ? 'rgba(247, 246, 242, 0.4)' : 'rgba(247, 246, 242, 0.2)';
});
*/

// Custom cursor
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover class for cursor size change
const interactiveElements = document.querySelectorAll('.btn, .nav-links a, .contact-item a, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        document.body.classList.add('hover');
    });
    element.addEventListener('mouseleave', () => {
        document.body.classList.remove('hover');
    });
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});

// Add section observer to change navbar text color
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'contact') {
            document.querySelector('.navbar').classList.add('on-dark-section');
        } else if (!entry.isIntersecting && entry.target.id === 'contact') {
            document.querySelector('.navbar').classList.remove('on-dark-section');
        }
    });
}, { threshold: 0.5 });

// Observe the contact section
observer.observe(document.querySelector('#contact'));

// Add navigation functionality
function updateNavArrows() {
    const navArrows = document.querySelectorAll('.nav-arrow');
    navArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            if (arrow.classList.contains('left') && currentSection > 0) {
                currentSection--;
                main.style.transform = `translateX(-${currentSection * 100}vw)`;
            } else if (arrow.classList.contains('right') && currentSection < sections.length - 1) {
                currentSection++;
                main.style.transform = `translateX(-${currentSection * 100}vw)`;
            }
        });
    });
}

// Call the function after DOM loads
document.addEventListener('DOMContentLoaded', updateNavArrows);
