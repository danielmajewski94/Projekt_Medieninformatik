let step = 1;

// Funktion zum Wechseln der Schritte
function StepNext() {
    console.log(step);
    if (step === 1) {
        document.getElementById('step1_gruss').style.display = 'none';
        document.getElementById('step2_hardware').style.display = 'block';

        step++;
    } else if (step === 2) {
        document.getElementById('step2_hardware').style.display = 'none';
        document.getElementById('step3_style').style.display = 'block';

        step++;
    } else if (step === 3) {
        document.getElementById('step3_style').style.display = 'none';
        document.getElementById('step4_video').style.display = 'block';

        step++;
        const button = document.getElementById('button_gruss');
        button.style.display = 'none';
    } else {
        step = 0;
    }
}


document.addEventListener('shown.bs.modal', function (event) {
    var modal = bootstrap.Modal.getInstance(event.target);
    var closeButton = document.getElementById('btn-close-vostellung');

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            modal.hide();
            document.getElementById('step1_gruss').style.display = 'block';
            document.getElementById('step3_style').style.display = 'none';
            document.getElementById('step4_video').style.display = 'none';
            document.getElementById('step2_hardware').style.display = 'none';
            step = 1;
            pauseVideo();
        });
    }
});

function pauseVideo() {
    var video = document.getElementById('video_container');
    if (video) {
        video.pause(); // Pausiert das Video
        video.currentTime = 0; // Setzt das Video auf den Startpunkt zurück
    }
}