const clockContainer = document.querySelector('.js-clock'), // 시계 위치를 가져오고
clockTitle = clockContainer.querySelector('h1'); // 시계의 글씨를 가져오고

function getTime() {  // 시간을 나타내는 펑션
  const date = new Date();  // 내장 Date객체의 인스턴스 생성
  const minutes = date.getMinutes();  // 내장 Date객체의 메소드 객체를 가져와 인스턴스 생성
  const hours = date.getHours(); // ㅇㅇ
  const seconds = date.getSeconds();  // ㅇㅇ
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // 가져온 시계 위치에 텍스트를 간단하게 조건부 연산자로 2자리수로 출력
}

function init() { 
  getTime(); // 펑션 가져와 실행
  setInterval(getTime, 1000); // 1초간격으로 펑션 실행
}

init(); // 위에 만든거 호출