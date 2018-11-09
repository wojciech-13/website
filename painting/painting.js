const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
const content = document.querySelector('.content');
const tools = document.querySelector('.tools');
const inputs = document.querySelectorAll('input');
const clear = document.querySelector('.clearButton');

canvas.width = content.clientWidth;
canvas.height = content.clientHeight - tools.clientHeight;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 22;

let isDrawing = false;
let direction = true;
let hue = 1;
let lastX = 0;
let lastY = 0;

function draw(e) {
    if(!isDrawing) return;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function handleRangeUpdate(e) {
    
    if (this.name === 'color')
    hue = this.value;

    if (this.name=== 'lineWidth')
    ctx.lineWidth = this.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
});

inputs.forEach(input => input.addEventListener('change', handleRangeUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleRangeUpdate));

clear.addEventListener('click', clearCanvas);

