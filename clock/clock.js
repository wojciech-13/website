const secondHand = document.querySelector('.second-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const text = document.querySelector('.text');

function setDate(){
    const now = new Date();

    const secondDegree = now.getSeconds()/60 * 360 + 90;
    secondHand.style.transform = `rotate(${secondDegree}deg)`;
    const minDegree = now.getMinutes()/60 * 360 + secondDegree/360*6 +90;
    minHand.style.transform = `rotate(${minDegree}deg)`;
    const hourDegree = now.getHours()/12 * 360 + minDegree/360*24 +90;
    hourHand.style.transform = `rotate(${hourDegree}deg)`;
}
setInterval(setDate, 1000);

function textDate(){
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    if(seconds < 10) 
    seconds = "0" + seconds;
    if(minutes < 10) 
    minutes = "0" + minutes;
    if(hours < 10) 
    hours = "0" + hours;
    text.innerHTML = `<span style="color:red">${hours} </span>: <span style="color:orange">${minutes} </span>: <span style="color:yellow">${seconds}</span>`;
}

setInterval(textDate, 1000);
