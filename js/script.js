// js/script.js
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            // Optional: Change icon based on state (requires icon font/SVG)
            // menuToggle.innerHTML = mainNav.classList.contains('is-open') ? '✕' : '☰';
        });

        // Close menu when a link is clicked (useful for single-page navigation or standard sites)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('is-open')) {
                    mainNav.classList.remove('is-open');
                     // menuToggle.innerHTML = '☰';
                }
            });
        });
    }

    // --- Dynamic Copyright Year ---
    const copyrightYearSpan = document.getElementById('copyright-year');
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = new Date().getFullYear();
    }

    // --- Simple Scroll Fade-In Animation ---
    const fadeElements = document.querySelectorAll('.fade-in-section');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: stop observing once visible
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        fadeElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers: make elements visible immediately
        fadeElements.forEach(el => el.classList.add('is-visible'));
    }

    // --- Active Nav Link Highlighting ---
    // Select nav links excluding the contact link in the header if it only points to a section
    const navLinks = document.querySelectorAll('.main-nav ul li a[href$=".html"], .main-nav ul li a[href="/"]'); // Select links ending with .html or root
    const pageUrl = window.location.pathname.split("/").pop() || "index.html"; // Get current page filename

    navLinks.forEach(link => {
        const linkUrl = link.getAttribute('href').split("/").pop() || "index.html";
        if (linkUrl === pageUrl) {
            link.parentElement.classList.add('active');
        } else {
             link.parentElement.classList.remove('active');
        }
    });


    // --- Smooth Scroll for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Ensure it's not just '#' or '#!'
            if(hrefAttribute.length > 1 && hrefAttribute.startsWith('#')) {
                 e.preventDefault();
                 const targetElement = document.querySelector(hrefAttribute);
                 if (targetElement) {
                     targetElement.scrollIntoView({
                         behavior: 'smooth'
                     });
                 }
            }
        });
    });

}); // End DOMContentLoaded