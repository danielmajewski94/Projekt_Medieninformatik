const calendar = document.getElementById('calendar');
const calendarYearMonth = document.getElementById('calendarYearMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const timeSelection = document.getElementById('timeSelection');

let currentDate = new Date();

// Monat und Jahr in der Kopfzeile anzeigen
function updateCalendarHeader() {
    const monthNames = [
        "Januar", "Februar", "März", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Dezember"
    ];
    calendarYearMonth.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
}

// Hilfsfunktion: Anzahl der Tage im Monat
function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Ersten Wochentag des Monats berechnen (Montag als Starttag)
function getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Sonntag (0) wird zu 6, Rest -1
}

// Kalender generieren
function generateCalendar(year, month) {
    calendar.innerHTML = '';
    const days = daysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    // Leere Felder für die Tage vor dem 1. des Monats
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendar.appendChild(emptyDay);
    }

    // Tage des Monats
    for (let i = 1; i <= days; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.className = 'day';

        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.day').forEach(day => day.classList.remove('selected'));
            dayElement.classList.add('selected');
        });

        calendar.appendChild(dayElement);
    }
}

// Monat ändern
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    updateCalendarHeader();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
}

// Uhrzeitauswahl erstellen (10:00 - 19:00)
function generateTimeSelection() {
    timeSelection.innerHTML = '';
    for (let hour = 10; hour <= 19; hour++) {
        const timeButton = document.createElement('button');
        timeButton.textContent = `${hour}:00`;
        timeButton.classList.add('time-button');

        timeButton.addEventListener('click', () => {
            document.querySelectorAll('.time-button').forEach(button => button.classList.remove('selected'));
            timeButton.classList.add('selected');
        });

        timeSelection.appendChild(timeButton);
    }
}

// Initialer Kalender und Uhrzeitauswahl
updateCalendarHeader();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
generateTimeSelection();

// Vorheriger Monat
prevMonthBtn.addEventListener('click', () => changeMonth(-1));

// Nächster Monat
nextMonthBtn.addEventListener('click', () => changeMonth(1));