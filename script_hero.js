document.addEventListener("DOMContentLoaded", () => {
    const heroText = document.getElementById("hero-text");
    const menu = document.getElementById("menu");
    menu.classList.add("hidden");

    let targetTextY = 0;
    let currentTextY = 0;
    const speed = 0.08;

    const hero = document.querySelector('.hero');
    const heroHeight = hero.offsetHeight;

    function updateMenuVisibility() {
        const scrollY = window.scrollY;

        // Text leicht nach oben scrollen
        targetTextY = scrollY * 0.5;

        // Menü nur anzeigen, wenn über Hero gescrollt
        if (scrollY > heroHeight) {
            menu.classList.remove("hidden");
            menu.classList.add("blue");
        } else {
            menu.classList.add("hidden");
            menu.classList.remove("blue");
        }
    }

    // Eventlistener für Scroll
    window.addEventListener("scroll", updateMenuVisibility);

    // Direkt beim Laden einmal prüfen
    updateMenuVisibility();

    // Animation für heroText
    function animate() {
        if (heroText) {
            currentTextY += (targetTextY - currentTextY) * speed;
            heroText.style.transform = `translateY(${currentTextY}px)`;
        }
        requestAnimationFrame(animate);
    }

    animate();
});
