let step = 1;

function StepNext() {
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
    }
}