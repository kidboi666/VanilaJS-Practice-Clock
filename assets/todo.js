const toDoForm = document.querySelector('.js-toDoForm'); // 폼 가져오고
const toDoInput = toDoForm.querySelector('input'); // 폼안에 인풋 가져오고
const toDoList = document.querySelector('.js-toDoList'); // ul 리스트 가져오고
const TODOS_LS = 'toDos'; // 변수 선언
let toDos = []; // 빈 배열 하나 만들고

function deleteToDo(event) { // 버튼 클릭 이벤트에 들어갈 함수
  const btn = event.target; // 매개변수의 target(자기자신)
  const li = btn.parentNode; // 자기자신의 부모노드
  toDoList.removeChild(li); // ul에서 자식 li가 담긴 li 변수 제거
  const cleanToDos = toDos.filter( // 
    toDo => toDo.id !== parseInt(li.id) // toDo에 id가
    );
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 로컬스토리지에 json으로 바꾼 객체 toDos를 TODOS_LS변수에 담아 저장함
}

function paintToDo(text) { // 매개변수 text
  const li = document.createElement('li'); // 문서에 li를 만들고
  const delBtn = document.createElement('button'); // button을 만들고
  const span = document.createElement('span'); // span을 만들고
  const newId = toDos.length + 1; // 할일 배열의 갯수를 하나 더 추가하고
  delBtn.innerText = '❌'; // 버튼에 이모지 할당
  delBtn.addEventListener('click', deleteToDo); // 버튼에 클릭 이벤트 생성 deleteToDo 함수 호출
  span.innerText = text; // span에 매개변수 할당
  li.appendChild(delBtn); //버튼을 li의 자식으로
  li.appendChild(span); // span을 li의 자식으로
  li.id = newId; // li의 id에 숫자 할당
  toDoList.appendChild(li); // li를 ul의 자식으로
  const toDoObj = { // toDoObj 배열에
    text: text, // 프로퍼티(text):값(text) -> 할일
    id: newId, // 프로퍼티(id):값(newId), -> 할일에 할당된 숫자
  };
  toDos.push(toDoObj); // 배열을 배열toDos에 푸쉬
  saveToDos(); // 함수 호출
}

function handleSubmit(event) {
  event.preventDefault(); // 이벤트의 기본동작을 취소함
  const currentValue = toDoInput.value; // 현재 인풋값을 할당 
  paintToDo(currentValue); // 할일 출력하는 함수에 인풋값을 인자로 지정 
  toDoInput.value = ''; // 현재 인풋값을 비움
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); // 로컬스토리지에 TODOS_LS 값 불러옴
  if (loadedToDos !== null) { // 만약 loadedToDos에 값이 없지 않다면
    const parsedToDos = JSON.parse(loadedToDos) //loadedToDos에 json을 객체로 변환한 뒤 변수 parsedToDos에 할당
    parsedToDos.forEach(function(toDo) { // parsedToDos에 내부 값에 forEach의 함수값을 일일이 적용
      paintToDo(toDo.text); // 할일출력하는 함수에 매개변수를 text로 반환
    });
  }
}

function init() {
  loadToDos(); // 할일 함수 호출
  toDoForm.addEventListener('submit', handleSubmit) // toDoForm에 서브밋 이벤트 생성 handleSubmit 함수 호출
}

init();