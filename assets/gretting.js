const form = document.querySelector('.js-form'), // 폼 위치 가져오고
  input = form.querySelector('input'), // 인풋도 가져오고
  greeting = document.querySelector('.js-greetings'); // 메시지 위치도 가져오고


const USER_LS = 'currentUser', // 커렌트 유저 변수 생성
  SHOWING_CN = 'showing'; // 쇼잉 변수 생성

function handleSubmit(event) { 
  event.preventDefault(); // 새로고침 안되게
  const currentValue = input.value; // 인풋의 입력값 변수 저장
  paintGreeting(currentValue); // 인풋입력값을 페인트그리팅 함수의 매개변수로 넘김
  saveName(currentValue); // 인풋입력값을 세이브네임 함수의 매개변수로 넘김
}

function saveName(text) { // 이름 저장하는 기능
  localStorage.setItem(USER_LS, text); // (key, value) text를 매개변수로 받아 로컬스토리지 객체에 저장
}

function paintGreeting(text) { // 입력받은 값을 바탕으로 메시지 출력 하는 기능
  form.classList.remove(SHOWING_CN); // form을 화면에서 없앰
  greeting.classList.add(SHOWING_CN); // greeting(메시지)를 출력
  greeting.innerText = `Hello ${text}` // greeting에 구체적인 메시지 할당
}

function askForName() {  // 이름 받는 인풋을 출력하는 기능
  form.classList.add(SHOWING_CN); // form 출력
  form.addEventListener('submit', handleSubmit) // submit 이벤트로 handleSubmit 함수 실행
}

function loadName() { // 문서 출력시 바로 실행될 코드
  const currentUser = localStorage.getItem(USER_LS); // 코드 블록에서 USER_LS 가져와 currentUser 할당
  if (currentUser === null){ // 유저가 없는 경우 askForName 실행
    askForName();
  } else { // 유저가 있는 경우 paintGreeting 실행
    paintGreeting(currentUser);
  }
}

function init() {
  loadName(); 
}

init(); // 초기 실행 값