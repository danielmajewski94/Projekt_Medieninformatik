let currentStep = 1;
let answers = [];

function nextStep() {
    if (currentStep === 1) {
        const selectedValue = document.querySelector('input[name="question1"]:checked');
        if (!selectedValue) {
            alert("Bitte wählen Sie eine Option aus, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Was soll ich fotografieren?", answer: selectedValue.value });

        if (selectedValue.value === "hochzeit") {
            document.getElementById('q2-hochzeit').style.display = 'block';
        } else if (selectedValue.value === "familie") {
            document.getElementById('q2-familie').style.display = 'block';
        } else {
            currentStep++;
        }

        document.getElementById('question1').style.display = 'none';
        currentStep++;

        if (currentStep === 3) {
            document.getElementById('q3-zeit').style.display = 'block';
        }

        console.log(currentStep);
    } else if (currentStep === 2) {
        const checkboxes = document.querySelectorAll('.question input[type="checkbox"]:checked');
        const selectedOptions = Array.from(checkboxes).map(cb => cb.value);
        answers.push({ question: "Details zur Auswahl", answer: selectedOptions });

        document.querySelectorAll('.question').forEach(q => q.style.display = 'none');
        document.getElementById('q3-zeit').style.display = 'block';
        currentStep++;
    } else if (currentStep === 3) {
        const timeInput = document.querySelector('input[name="time-option"]');
        if (!timeInput.value) {
            alert("Bitte geben Sie eine Zeit ein, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Wie lange soll der Fotograf anwesend sein?", answer: timeInput.value });

        document.getElementById('q3-zeit').style.display = 'none';
        document.getElementById('q4-budget').style.display = 'block';
        currentStep++;
    } else if (currentStep === 4) {
        const budgetInput = document.querySelector('input[name="budget-option"]');
        if (!budgetInput.value) {
            alert("Bitte geben Sie ein Budget ein, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Wie viel möchtest du ungefähr ausgeben?", answer: budgetInput.value });

        document.getElementById('q4-budget').style.display = 'none';
        document.getElementById('q5-calendar').style.display = 'block';
        currentStep++;
    } else if (currentStep === 5) {
        document.getElementById('q5-calendar').style.display = 'none';
        document.getElementById('q6-ort').style.display = 'block';
        currentStep++;
    } else if (currentStep === 6) {
        alert("Vielen Dank für Ihre Teilnahme!");
        console.log("Gesammelte Antworten:", answers);
        currentStep = 1;
    }
}

document.getElementById("ModalUmfrage").addEventListener("hidden.bs.modal", function () {
    currentStep = 0;
});
