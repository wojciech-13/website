const content = document.querySelector('.content');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const button = document.querySelector('button');
const score = document.querySelector('.score');
const scoreHero = document.querySelector('.scoreHero');
const scoreVillain = document.querySelector('.scoreVillain');
const winOrLose = document.querySelector('.winOrLose');
const restart = document.querySelector('#restart');

var intervalID = null;

let hero = 0;
let villain = 0;
let pointsToEnd = 5;  // Game ends when hero or villain score this

scoreHero.innerHTML = hero;
scoreVillain.innerHTML = villain;

canvas.width = 800;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20; 
let ballX;
let ballY;



let paddleHeight = 100; 
let paddleWidth = 20;

// DISTANCE OF PADDLES FROM EDGE
const playerX = 70;
const aiX = canvas.width - playerX - paddleWidth; 

let playerY = (canvas.height - paddleHeight)/2;
let aiY = (canvas.height - paddleHeight)/2;
// 

const lineWidth = 4;
const lineHeight = 16;

let ballSpeedX;
let ballSpeedY;

// randomDir - Randomly set start direction of next ball.
function randomDir(){
    if( randomNumber() <= 2.5 ){
        ballSpeedX = - ballSpeedX;
        
    }
    if( randomNumber() > 2.5  && randomNumber() <= 5){
        
        ballSpeedY = - ballSpeedY
    }
    if( randomNumber() >5 && randomNumber() <= 7.5 ){
        ballSpeedX = - ballSpeedX;
        ballSpeedY = - ballSpeedY;
    }
    if( randomNumber() > 7.5){
        return;
    }   
}
// 


function startValues(){
    ballX = (cw - ballSize)/2;
    ballY = (ch - ballSize)/2;
    aiY = (canvas.height - paddleHeight)/2;
    playerY = (canvas.height - paddleHeight)/2;
    ballSpeedY = 1;
    ballSpeedX = 1;
    randomDir();
}

function player(){
    ctx.fillStyle = '#7FFF10';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}
function ai (){
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

function ball() {
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    scoreVillain.innerHTML = villain;
    scoreHero.innerHTML = hero;
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    //CHECKING FOR BALL COLISION WITH EDGE
    if( ballY  <= 0 || (ballY + ballSize) >= ch ){
        ballSpeedY = -ballSpeedY;
        speedUp(); //SPEED BALL WHEN COLISION
    }
    console.log(villain);
    
    
    if( ballX <= 0){

        villain +=1;
        scoreVillain.innerHTML = villain;
        startValues();

        if(villain === pointsToEnd){
            clearInt();
            startValues();
            game();
            score.classList.add("hidden");
            winOrLose.classList.remove('hidden');
            winOrLose.innerHTML = "YOU LOSE";
            changeButtons();
        }

        
        
    }
    
    
    if( (ballX + ballSize ) >= cw){

        hero += 1;
        scoreHero.innerHTML = hero;
        startValues();

        if(hero === pointsToEnd){
            clearInt();
            startValues();
            game();
            score.classList.add("hidden");
            winOrLose.classList.remove('hidden');
            winOrLose.innerHTML = "YOU WIN";
            changeButtons();
            }
        
    }

    // 

    //CHECKING FOR BALL COLISION WITH PADDLE
    if( ballX <= playerX + paddleWidth && ballX >= playerX +paddleWidth - 4 && (ballY + ballSize)> playerY && ballY < (playerY + paddleHeight))
    {
        if(randomNumber() <=4)
            ballSpeedX = - ballSpeedX;
        else{
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY; 
        }
    }

    if( ballX + ballSize >= aiX  && ballX <= aiX + 4 && (ballY + ballSize)> aiY && ballY < (aiY + paddleHeight))
    {

        if(randomNumber() <=4)
            ballSpeedX = - ballSpeedX;
        else{
            ballSpeedX = -ballSpeedX;
            ballSpeedY = -ballSpeedY; 
        }
    }
    // 
}

function table() {``
    // TABLE
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    // LINES IN CENTER
    for (let linePosition = 20; linePosition < ch; linePosition += 30)
    {
        ctx.fillStyle = "gray";
        ctx.fillRect((cw - lineWidth)/2, linePosition, lineWidth, lineHeight);
    }
}

function playerPosition(e){

    playerY = e.offsetY - paddleHeight/2;

    if( playerY <= 0){
        playerY = 0;
    }
    if( playerY >= ch - paddleHeight){
        playerY = ch - paddleHeight;
    }
}

// SPEEDING
function speedUp(){
    // SPEED X
    if (ballSpeedX > 0 && ballSpeedX < 4) {
        ballSpeedX += 0.2;
    }
    if (ballSpeedX < 0 && ballSpeedX > -4) {
        ballSpeedX -= 0.2;
    }

    // SPEED Y 
    if (ballSpeedY > 0 && ballSpeedY < 4) {
        ballSpeedY += 0.2;
    }
    if (ballSpeedY < 0 && ballSpeedY > -4) {
        ballSpeedY -= 0.2;
    }
}

// AI POSITION
function aiPosition() {
    const middlePaddle = aiY + paddleHeight/2;
    const middleBall = ballY + ballSize / 2;

    if (ballX > 500) {
        if ( middlePaddle - middleBall > 50 ){
            aiY -= 3;
        }
        else if ( middlePaddle - middleBall > 50 ){
            aiY -= 2;
        }
        else if ( middlePaddle - middleBall < -200 ){
            aiY += 2;
        }
        else if ( middlePaddle - middleBall < -50 ){
            aiY += 3;
        }


    }
    else if (ballX <= 500 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 4;
        }
        else if (middlePaddle - middleBall < -100){
            aiY +=4;
        }
    }

}

function randomNumber() {
    return Math.floor(Math.random() * 10);
}

function game(){
    table()
    ball()
    player()
    ai()
    aiPosition()
}

function setInt(){
    clearInterval(intervalID);
    intervalID = setInterval(game, 5);
}
function clearInt(){
    clearInterval(intervalID);
}


function showHideScore(){
    content.classList.toggle('hidden');
}


function changeButtons(){
    button.style.display = 'none';
    restart.style.display = 'block';
}

function restartGame(){
    winOrLose.classList.add('hidden');
    score.classList.remove('hidden');
    startValues();
    setInt();
    hero = 0;
    villain = 0;
}
startValues();
game();

canvas.addEventListener('mousemove', playerPosition);

button.addEventListener('click', setInt);


restart.addEventListener('click', restartGame);


