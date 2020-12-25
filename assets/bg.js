const body = document.querySelector('body'); // body 가져옴

const IMG_NUMBER = 5; // 이미지 숫자에 5할당

function paintImage(imgNumber) { // 이미지 뿌리는 기능
  const image = new Image(); // 새 이미지 인스턴스 생성
  image.src = `assets/images/${imgNumber + 1}.jpg`; // 이미지 src에 이미지 위치 저장, 이미지 이름은 난수를 이용해 지정
  image.classList.add('bgImage') // 이미지 엘리먼트에 class '.bgImage'를 추가
  // element.classList.add / remove('class') -> class를 추가하거나 제거
  // element.classList.toggle('class') -> class가 존재할 경우 class를 제거하고 , 그렇지 않은 경우엔 추가
  // element.classList.contains('class') -> class 존재 여부에 따라 true/false를 반환
  body.prepend(image); // image를 바디안에 맨 앞에 삽입
  // node.append(노드나 문자열) – 노드나 문자열을 node 끝에 삽입합니다.
  // node.prepend(노드나 문자열) – 노드나 문자열을 node 맨 앞에 삽입합니다.
  // node.before(노드나 문자열) –- 노드나 문자열을 node 이전에 삽입합니다.
  // node.after(노드나 문자열) –- 노드나 문자열을 node 다음에 삽입합니다.
  // node.replaceWith(노드나 문자열) –- node를 새로운 노드나 문자열로 대체합니다.
}

function genRandom() { // 난수 생성 기능
  const number = Math.floor(Math.random() * IMG_NUMBER); // number에 IMG_NUMBER만큼의 난수를 생성
  return number; // 그걸 반환
}

function init() {
  const randomNumber = genRandom(); // 변수 randomNumber에 난수생성함수 genRandom()을 할당
  paintImage(randomNumber); // 이미지 할당 함수 paintImage에 난수생성함수 randomNumber를 인자로 할당
}

init(); // 그걸 실행함