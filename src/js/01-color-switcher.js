const dataStartBtn = document.querySelector('[data-start]');
const dataStopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

dataStartBtn.addEventListener('click', onStart);
dataStopBtn.addEventListener('click', onStop);

function onStart() {
  timerId = setInterval(bgColor, 1000);

  dataStartBtn.toggleAttribute('disabled');
  dataStopBtn.removeAttribute('disabled');
}



function onStop() {
  clearInterval(timerId);

  dataStartBtn.removeAttribute('disabled');
  dataStopBtn.toggleAttribute('disabled');
}


function bgColor() {
  body.style.backgroundColor = getRandomHexColor();
}