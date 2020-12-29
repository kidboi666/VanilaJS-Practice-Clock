const newYearMessage = document.querySelector('.js-newYear');
const span = document.createElement('span');

function happyNewYear() {
  const newYear = new Date();
  if(newYear.getMonth() == 0 && newYear.getDate() == 1) {    
    newYearMessage.appendChild(span);
    span.innerText = 'HappyNewYear!!';
  }
}

function init() {
  happyNewYear();
}

init();