const weather = document.querySelector('.js-weather'); // 웨더 출력 위치 잡기

const API_KEY = '38e47f6f2792e72009b45c3c11378a90' // api 공급업체에 보여주는 자신의 아이피같은 개념
let COORDS = 'coords'; // 좌표

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    // fetch(접근하고자 하는 url, [option->메소드나 헤더등을 지정할 수 있음])
    ).then(function(response) { // fetch에 api를 완전히 로딩되면 그때 함수를 실행한다.
    return response.json();  // json 호출
  }).then(function(json) { // 위에꺼를 실행하면 json매개변수를 받는 익명함수를 실행
    const temperature = json.main.temp; // 온도 변수에 json의 메인 배열에 템프 프로퍼티 할당
    const place = json.name; // 장소 변수에 json의 이름 프로퍼티 할당
    weather.innerText = `${temperature}℃ @ ${place}` // 출력
  })
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj)); // 변수 COORDS에 객체에서 json으로 바꾼 좌표값 coordsObj를 할당
  // JSON.stringify -> 객체를 JSON으로 바꿔줌
} // localStorage.setItem(key, value) -> 키 값 쌍을 보관합니다
// localStorage.getItem(key) -> 키에 해당하는 값을 받아옵니다

function handleGeoSucces(position) {
  const latitude = position.coords.latitude; // latitude변수에 position의 프로퍼티 coords에 프로퍼티 latitude 할당
  const longitude = position.coords.longitude; // longitude변수에 position의 프로퍼티 coords에 프로퍼티 longitude 할당
  const coordsObj = {
    latitude, // latitude : latitude,
    longitude, // longitude : longitude,
  };
  saveCoords(coordsObj); // 변수 COORDS에 좌표값 저장
  getWeather(latitude, longitude); // latitude엔 latitude좌표를, longitude엔 longitude 좌표를 저장
}

function handleGeoError() {
  console.log('Cant access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError); // geolocation 객체에 getCurrentPosition(위치를 알아낸 후 호출할 콜백함수, 오류 발생시 호출할 함수) 로 현재 위치 정보를 최신 초기화함
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS); // localStorage.getItem(key) -> 키에 해당하는 값을 받아옵니다.
  if(loadedCoords === null) { // localStorage에 키에 해당하는 값이 null일 경우 askForCoords 함수 호출
    askForCoords(); // 좌표값이 없을때만 실행. 최초 실행할 조건. 즉 한번 위치값이 지정되면 다른 곳으로 이동해도 값이 안바뀔듯?
  } else {
    const parsedCoords = JSON.parse(loadedCoords); // JSON.parse() -> JSON을 객체로 바꿔줍니다.
    getWeather(parsedCoords.latitude, parsedCoords.longitude); // 날씨 api를 받아오는 getWeather에 위도와 경도를 매개변수의 인자로 호출하여 위치 정보 부터 파악.
  }
}

function init() {
  loadCoords();
}

init();



// 1. 좌표 불러오는 함수 실행
// 2. 로컬 스토리지에 좌표값 로딩 
// 3. 로컬 스토리지에 값이 있는지 없는지 확인 후 조건문으로 함수 실행
// a.1. 값이 있을 경우 바로 날씨 함수 호출
// a.2. 로컬 스토리지에 저장된 좌표값을 가져와 날씨 함수 매개변수에 할당해 fetch api 주소값에 넣음(json에 적용)
// a.3. 그 뒤 json을 로딩 완료후 호출해 변수 할당
// a.4. 출력
// b.1. 값이 없을 경우 현재 위치 좌표값을 불러오는 메서드 실행
// b.2. 사용자가 허용하지 않았다면 에러 메세지 출력
// b.3. 사용자가 허용했다면 (즉, 현재 위치 좌표값을 불러오는데 성공했다면) 좌표값을 변수에 할당
// b.4. 할당 변수를 객체 프로퍼티로 할당, 코드를 로컬스토리지에 저장하는 함수와 날씨 함수 호출
// b.5. 변수 COORDS에 좌표객체를 할당하고 로컬 스토리지에 json형태로 저장
// b.6. 날씨 함수를 호출하여 위 a.2~4 과정 반복