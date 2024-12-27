
const dropArea = document.getElementById('drop-area');
const dropText = document.getElementById('drop-text');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
var RatingTextarea = document.getElementById('Rating-Textarea');
var RatingTexttitle = document.getElementById('floatingInput');

var selectedRating = 0;
var selectedImage = "";

var Bewertungen = [
    /*    {
            id: 1,
            Bild: "Bilder/IMG_9496.jpg",
            Sterne: 3,
            Titel: "Gut!",
            Bewertung: "Sehr solide und toll"
        },
        {
            id: 3,
            Bild: "Bilder/IMG_4001.jpg",
            Sterne: 5,
            Titel: "Perfekt!",
            Bewertung: "Einfach super perfekt."
        },
        {
            id: 2,
            Bild: "Bilder/BX3A4429.png",
            Sterne: 4,
            Titel: "Supi!",
            Bewertung: "Einfach supi Bilder"
        }*/
];

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
        selectedImage = event.target.result
        preview.src = selectedImage;
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
        updateStars(index + 1);
    });

    star.addEventListener('mouseout', () => {
        updateStars(currentRating);
    });

    star.addEventListener('click', () => {
        currentRating = index + 1;
        selectedRating = currentRating;
        updateStars(currentRating);
    });
});

function updateStars(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}


function addBewertung() {

    var neuesBewertung = {
        id: 4,
        Bild: selectedImage,
        Sterne: selectedRating,
        Titel: RatingTexttitle.value,
        Bewertung: RatingTextarea.value
    };

    removeAllAccordionItems();
    Bewertungen.push(neuesBewertung);
    generateAccordion();
    preview.src = '';
    preview.style.display = 'none';
    dropArea.style.display = 'block';
    dropText.innerHTML = `Ziehe dein Bild hier her oder <span class="browse - link">Durchsuchen</span>`;
    RatingTextarea.value = "";
    RatingTexttitle.value = "";
}

function removeAllAccordionItems() {
    var items = document.querySelectorAll('.accordion-item');

    items.forEach(function (item) {
        item.remove();
    });
}

window.onload = function () {
    generateAccordion();
};

function generateAccordion() {
    var RatingAccordion = document.getElementById('Rating-Accordion');

    Bewertungen.forEach(function (bewertung, index) {
        var accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        var HTMLText = ``;

        HTMLText = `
            <h2 class="accordion-header" id="rating-heading-${bewertung.id}-${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                        data-bs-target="#rating-collapse-${bewertung.id}-${index}" aria-expanded="false" aria-controls="rating-collapse-${bewertung.id}-${index}"><div class="rating-acc-header">
        `;

        for (i = 0; i < 5; i++) {
            if (i < bewertung.Sterne) {
                HTMLText = HTMLText + `<span style="color: gold">&#9733;</span>`;
            } else {
                HTMLText = HTMLText + `<span style="color: lightgray">&#9733;</span>`;
            }
        }

        HTMLText = HTMLText + ` <strong>${bewertung.Titel}</strong>
                </div></button>
            </h2>
            <div id="rating-collapse-${bewertung.id}-${index}" class="accordion-collapse collapse" aria-labelledby="rating-heading-${bewertung.id}-${index}" data-bs-parent="#Rating-Accordion">
                <div class="accordion-body">
                    <div class="Rating-accordion-body">
                        <img src="${bewertung.Bild}" alt="Bewertung Bild" class="Rating-img">
                        <p>${bewertung.Bewertung}</p>
                    </div>
                </div>
            </div>`;

        accordionItem.innerHTML = HTMLText;
        RatingAccordion.appendChild(accordionItem);
    });
}
