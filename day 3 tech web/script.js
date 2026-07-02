// ================================
// TechLearn JavaScript
// ================================

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {

        if (this.getAttribute('href').startsWith('#')) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }

        }

    });
});

// ================================
// Fade In Animation
// ================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

}, {
    threshold: 0.2
});

document.querySelectorAll(".hero, .courses, .about, .contact").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});

// ================================
// Active Navigation
// ================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ================================
// Button Effects
// ================================

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        btn.style.transform = "scale(0.95)";

        setTimeout(() => {

            btn.style.transform = "scale(1)";

        }, 150);

    });

});

// ================================
// Course Card Hover
// ================================

document.querySelectorAll(".course-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});

// ================================
// Welcome Message
// ================================

window.addEventListener("load", () => {

    console.log("Welcome to TechLearn!");

});

// ================================
// Get Started Button
// ================================

const startBtn = document.querySelector(".start-btn");

if (startBtn) {

    startBtn.addEventListener("click", () => {

        document.querySelector("#courses").scrollIntoView({
            behavior: "smooth"
        });

    });

}

// ================================
// Explore Courses Button
// ================================

const exploreBtn = document.querySelector(".course-btn");

if (exploreBtn) {

    exploreBtn.addEventListener("click", () => {

        document.querySelector("#courses").scrollIntoView({
            behavior: "smooth"
        });

    });

}