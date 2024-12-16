let currentStep = 1;
let answers = [];
var inputDatenName = document.getElementById('inputDatenName');
var inputDatenMail = document.getElementById('inputDatenMail');
let selectedDate = null;
let selectedTime = null;


const calendar = document.getElementById('calendar');
const calendarYearMonth = document.getElementById('calendarYearMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const timeSelection = document.getElementById('timeSelection');

let currentDate = new Date();

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
        answers.push({ question: "Wie lange soll der Fotograf anwesend sein?", answer: timeInput.value + " Stunden" });

        document.getElementById('q3-zeit').style.display = 'none';
        document.getElementById('q4-budget').style.display = 'block';
        currentStep++;
    } else if (currentStep === 4) {
        const budgetInput = document.querySelector('input[name="budget-option"]');
        if (!budgetInput.value) {
            alert("Bitte geben Sie ein Budget ein, bevor Sie fortfahren.");
            return;
        }
        answers.push({ question: "Wie viel möchtest du ungefähr ausgeben?", answer: budgetInput.value + " €" });

        document.getElementById('q4-budget').style.display = 'none';
        document.getElementById('q5-calendar').style.display = 'block';
        currentStep++;
    } else if (currentStep === 5) {
        answers.push({ question: "Datum?", answer: selectedDate });
        answers.push({ question: "Zeit?", answer: selectedTime });

        document.getElementById('q5-calendar').style.display = 'none';
        document.getElementById('q6-ort').style.display = 'block';
        currentStep++;
    } else if (currentStep === 6) {
        document.getElementById('q6-ort').style.display = 'none';
        document.getElementById('q7-daten').style.display = 'block';


        var selectedOption = document.querySelector('input[name="ort"]:checked').value;

        if (selectedOption === 'BeimFotograf') {
            answers.push({ question: "Was soll ich fotografieren?", answer: "Beim Fotograf" });
        } else if (selectedOption === 'BeimSonstige') {
            answers.push({ question: "Was soll ich fotografieren?", answer: document.getElementById('umfragSonstigeText').value });
        }


        var buttonUmfrageWeiter = document.getElementById('buttonUmfrageWeiter');

        if (buttonUmfrageWeiter) {
            buttonUmfrageWeiter.textContent = 'SENDEN';
        }
        currentStep++;
    } else if (currentStep === 7) {
        sendEmailTerminvergabe();
        alert("Vielen Dank! Ihre E-Mail wurde gesendet!");
        console.log("Gesammelte Antworten:", answers);
        currentStep = 1;
    }
}

document.getElementById("ModalUmfrage").addEventListener("hidden.bs.modal", function () {
    currentStep = 0;
});

function sendEmailTerminvergabe(event) {
    if (event) event.preventDefault();

    var messagetext = "";

    answers.forEach(item => {
        messagetext = messagetext + "\n" + item.question + ": " + item.answer;
    })

    const params = {
        to_name: 'Daniel',
        from_name: inputDatenName.value,
        from_email: inputDatenMail.value,
        message: messagetext
    };

    emailjs.send('service_vcbxxq7', 'template_yc7w0tg', params)
        .then(response => {
        }, error => {
        });
}


//Kalender

function updateCalendarHeader() {
    const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
    calendarYearMonth.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
}

function generateCalendar(year, month) {
    calendar.innerHTML = '';
    const days = daysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendar.appendChild(emptyDay);
    }

    for (let i = 1; i <= days; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.className = 'day';
        const formattedDate = `${String(i).padStart(2, '0')}.${String(month + 1).padStart(2, '0')}.${year}`;
        dayElement.dataset.date = formattedDate;

        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
            dayElement.classList.add('selected');
            selectedDate = dayElement.dataset.date;
            console.log('Ausgewähltes Datum:', selectedDate);
        });

        calendar.appendChild(dayElement);
    }
}

function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    updateCalendarHeader();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

function generateTimeSelection() {
    timeSelection.innerHTML = '';
    for (let hour = 10; hour <= 19; hour++) {
        const timeButton = document.createElement('button');
        timeButton.textContent = `${hour}:00`;
        timeButton.classList.add('time-button');

        timeButton.addEventListener('click', () => {
            document.querySelectorAll('.time-button').forEach(button => button.classList.remove('selected'));
            timeButton.classList.add('selected');
            selectedTime = timeButton.textContent.trim();
            console.log('Ausgewählte Zeit:', selectedTime);
        });

        timeSelection.appendChild(timeButton);
    }
}

updateCalendarHeader();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
generateTimeSelection();

prevMonthBtn.addEventListener('click', () => changeMonth(-1));

nextMonthBtn.addEventListener('click', () => changeMonth(1));