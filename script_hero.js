
const heroText = document.getElementById("hero-text");
const menu = document.getElementById("menu");
menu.classList.add("hidden");

let targetTextY = 0;
let currentTextY = 0;
const speed = 0.08;

const heroHeight = document.querySelector('.hero').offsetHeight;

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Text leicht nach oben scrollen
    targetTextY = scrollY * 0.5;

    // Menü nur anzeigen, wenn über Hero gescrollt
    if (scrollY > heroHeight) {
        menu.classList.remove("hidden"); // sichtbar
        menu.classList.add("blue");      // blau
    } else {
        menu.classList.add("hidden");    // ausblenden
        menu.classList.remove("blue");
    }
});

function animate() {
    if (heroText) {
        currentTextY += (targetTextY - currentTextY) * speed;
        heroText.style.transform = `translateY(${currentTextY}px)`;
    }
    requestAnimationFrame(animate);
}

animate();

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // einblenden
            } else {
                entry.target.classList.remove('show'); // ausblenden
            }
        });
    }, { threshold: 0.1 }); // 10% Sichtbarkeit triggern

    items.forEach(item => observer.observe(item));
});