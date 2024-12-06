let currentStep = 1;
let answers = []; // Array zum Speichern der Antworten

function nextStep() {
    if (currentStep === 1) {
        // Antwort von Frage 1 sammeln
        const selectedValue = document.querySelector('input[name="question1"]:checked');
        if (!selectedValue) {
            alert("Bitte wählen Sie eine Option aus, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Was soll ich fotografieren?", answer: selectedValue.value });

        // Zeige die zweite Frage basierend auf der Auswahl
        if (selectedValue.value === "hochzeit") {
            document.getElementById('q2-hochzeit').style.display = 'block';
        } else if (selectedValue.value === "familie") {
            document.getElementById('q2-familie').style.display = 'block';
        } else {
            currentStep++;
        }

        // Verstecke die erste Frage
        document.getElementById('question1').style.display = 'none';
        currentStep++;

        if (currentStep === 3) {
            document.getElementById('q3-zeit').style.display = 'block';
        }

        console.log(currentStep);
    } else if (currentStep === 2) {
        // Antwort von Frage 2 sammeln
        const checkboxes = document.querySelectorAll('.question input[type="checkbox"]:checked');
        const selectedOptions = Array.from(checkboxes).map(cb => cb.value);
        answers.push({ question: "Details zur Auswahl", answer: selectedOptions });

        // Verstecke die zweite Frage und zeige die dritte (Time)
        document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
        document.getElementById('q3-zeit').style.display = 'block';
        currentStep++;
    } else if (currentStep === 3) {
        // Antwort von Frage 3 sammeln
        const timeInput = document.querySelector('input[name="time-option"]');
        if (!timeInput.value) {
            alert("Bitte geben Sie eine Zeit ein, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Wie lange soll der Fotograf anwesend sein?", answer: timeInput.value });

        // Verstecke die dritte Frage und zeige die vierte (Budget)
        document.getElementById('q3-zeit').style.display = 'none';
        document.getElementById('q4-budget').style.display = 'block';
        currentStep++;
    } else if (currentStep === 4) {
        // Antwort von Frage 3 sammeln
        const budgetInput = document.querySelector('input[name="budget-option"]');
        if (!budgetInput.value) {
            alert("Bitte geben Sie ein Budget ein, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Wie viel möchtest du ungefähr ausgeben?", answer: budgetInput.value });

        // Verstecke die dritte Frage und zeige die vierte (Budget)
        document.getElementById('q4-budget').style.display = 'none';
        document.getElementById('q5-calendar').style.display = 'block';
        currentStep++;
    } else if (currentStep === 5) {
        // Umfrage abschließen
        alert("Vielen Dank für Ihre Teilnahme!");
        console.log("Gesammelte Antworten:", answers);
        currentStep = 1;
    }
}

document.getElementById("ModalUmfrage").addEventListener("hidden.bs.modal", function () {
    currentStep = 0;
});
