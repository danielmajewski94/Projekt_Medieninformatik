
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