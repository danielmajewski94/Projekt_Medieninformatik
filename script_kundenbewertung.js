
const dropArea = document.getElementById('drop-area');
const dropText = document.getElementById('drop-text');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');

// Simulate click on the hidden file input when clicking the "Durchsuchen" link
document.querySelector('.browse-link').addEventListener('click', () => {
    fileInput.click();
});

// Add drag-and-drop functionality
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault(); // Prevent default behavior
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (event) => {
    event.preventDefault(); // Prevent default behavior
    dropArea.classList.remove('dragover');

    const files = event.dataTransfer.files;
    handleFiles(files); // Handle the files
});

// Handle file input changes
fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    handleFiles(files);
});

// Function to process the files
function handleFiles(files) {
    for (const file of files) {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            console.log(`File uploaded: ${file.name}`);
            dropText.innerHTML = "Danke! Ihre Datei wurde hochgeladen.";
            displayImage(file);
        } else {
            dropText.innerHTML = "Es werden nur JPG- und PNG-Dateien akzeptiert<br><span class='browse-link'>Durchsuchen</span>";
            dropArea.style.borderColor = '#a00404';
        }
    }
}

// Bild anzeigen
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        preview.src = event.target.result;
        preview.style.display = 'block';
        dropArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

const stars = document.querySelectorAll('.star-rating label');
const inputs = document.querySelectorAll('.star-rating input');

let currentRating = 0;

// Hover-Effekt
stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => {
        // Färbt alle Sterne bis zum aktuellen Stern gold
        updateStars(index + 1);
    });

    star.addEventListener('mouseout', () => {
        // Wenn kein Rating ausgewählt, zurücksetzen
        updateStars(currentRating);
    });

    star.addEventListener('click', () => {
        // Setzt die Bewertung und zeigt die Sterne entsprechend an
        currentRating = index + 1;
        updateStars(currentRating);
    });
});

// Funktion, um Sterne je nach Bewertung zu färben
function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected'); // Färbt den Stern gold
        } else {
            star.classList.remove('selected'); // Entfernt die goldene Farbe
        }
    });
}
