const buttons = document.querySelectorAll('.buttons button');
const rubic = document.querySelector('#rubic');
console.log(rubic);
function addClass() {
    rubic.classList.add('rubic2');
}
function removeClass() {
    rubic.classList.remove('rubic2');
}
function resumeRotate() {
    rubic.style.animationPlayState= "running";
}
function pauseRotate() {
    if( !rubic.classList.contains('rubic2') )
    return;
    rubic.style.animationPlayState= "paused";
}

buttons[0].addEventListener('click', addClass);
buttons[1].addEventListener('click', removeClass);
buttons[1].addEventListener('click', resumeRotate);
buttons[2].addEventListener('click', pauseRotate);
buttons[3].addEventListener('click', resumeRotate);