
document.getElementById("btn_datenschutz").addEventListener("click", function () {
    window.open("Dokumente/Datenschutz.pdf", "_blank");
});

document.addEventListener("DOMContentLoaded", function () {
    // Überprüfen, ob der Nutzer die Cookies bereits akzeptiert oder abgelehnt hat
    if (!localStorage.getItem("cookies-accepted") && !localStorage.getItem("cookies-declined")) {
        document.getElementById("cookie-modal").style.display = "block"; // Modal anzeigen
    }

    // Event Listener für den "Akzeptieren"-Button
    document.getElementById("accept-cookies").addEventListener("click", function () {
        // Speichern, dass der Nutzer die Cookies akzeptiert hat
        localStorage.setItem("cookies-accepted", "true");

        // Modal ausblenden
        document.getElementById("cookie-modal").style.display = "none";
    });

    // Event Listener für den "Ablehnen"-Button
    document.getElementById("decline-cookies").addEventListener("click", function () {
        // Speichern, dass der Nutzer die Cookies abgelehnt hat
        localStorage.setItem("cookies-declined", "true");

        // Modal ausblenden
        document.getElementById("cookie-modal").style.display = "none";
    });

    // Event Listener für das Schließen des Modals über das "X"-Symbol
    document.getElementById("close-modal").addEventListener("click", function () {
        document.getElementById("cookie-modal").style.display = "none";
    });

    // Schließen des Modals, wenn der Nutzer außerhalb des Modals klickt
    window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("cookie-modal")) {
            document.getElementById("cookie-modal").style.display = "none";
        }
    });
});