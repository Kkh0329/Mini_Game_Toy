let startTime; // 시작 시간 변수
let timerInterval; // 타이머 간격 변수
const gameBoard = document.getElementById('game-board'); // 게임 보드 요소
const timeDisplay = document.getElementById('time'); // 시간 표시 요소
const startButton = document.getElementById('start-button'); // 시작 버튼 요소
const gameDuration = 7; // 게임 시간(초)

const images = [
    'smile.png', // 359 개의 동일한 이미지
    'sad.png'  // 1 개의 다른 이미지
];

startButton.addEventListener('click', startGame); // 시작 버튼 클릭 시 startGame 함수 호출

function startGame() {
    initializeGame(); // 게임 초기화 함수 호출
    startButton.disabled = true; // 게임 중에는 시작 버튼 비활성화
}

function initializeGame() {
    // 게임 보드 초기화
    gameBoard.innerHTML = '';

    // 다른 이미지를 위한 인덱스 랜덤 선택
    const differentImageIndex = Math.floor(Math.random() * 360);

    // 이미지 요소 생성 및 게임 보드에 추가
    for (let i = 0; i < 360; i++) {
        const img = document.createElement('img');
        img.src = (i === differentImageIndex) ? images[1] : images[0];
        img.addEventListener('click', () => checkImage(i, differentImageIndex));
        gameBoard.appendChild(img);
    }

    // 타이머 초기화 및 시작
    startTime = new Date();
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timeDisplay.textContent = '남은 시간: ' + gameDuration + 's'; // 초기값으로 7초 설정
    timerInterval = setInterval(updateTime, 1000); // 1초마다 업데이트
}

function checkImage(selectedIndex, differentImageIndex) {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000;

    if (selectedIndex === differentImageIndex && elapsedTime <= gameDuration) {
        clearInterval(timerInterval);
        startButton.disabled = false; // 새 게임을 시작하기 위해 시작 버튼 활성화
        displayMessage('성공!');
        
        // 성공한 경우 성공한 시간(초)을 로컬 스토리지에 저장
        localStorage.setItem('lastTime', elapsedTime);

        // 성공한 시간(초)을 페이지에 표시
        const lastTimeDisplay = document.getElementById('last-time');
        lastTimeDisplay.textContent = '찾은 시간: ' + elapsedTime + 's';
    }
}

function updateTime() {
    const currentTime = new Date();
    const elapsedTime = (currentTime - startTime) / 1000;
    const remainingTime = Math.max(gameDuration - Math.floor(elapsedTime), 0); // 음수가 되지 않도록 보정
    timeDisplay.textContent = 'Time: ' + remainingTime + 's';

    if (elapsedTime >= gameDuration) {
        clearInterval(timerInterval);
        startButton.disabled = false; // 새 게임을 시작하기 위해 시작 버튼 활성화
        displayMessage('실패!');
    }
}

function displayMessage(message) {
    const messageContainer = document.createElement('div');
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.fontSize = '300px'; // 글꼴 크기 300px
    messageDiv.style.color = 'red'; // 글자 색상 빨강
    messageDiv.style.fontWeight = 'bold'; // 글자 굵게
    messageContainer.style.position = 'absolute'; // 절대 위치 설정
    messageContainer.style.top = '50%'; // 세로 중앙 정렬
    messageContainer.style.left = '50%'; // 가로 중앙 정렬
    messageContainer.style.transform = 'translate(-50%, -50%)'; // 중앙 정렬을 위한 transform
    messageContainer.style.padding = '20px'; // 내부 여백 설정
    messageContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // 네모난 창 배경색 및 투명도 설정
    messageContainer.style.border = '2px red'; // 네모난 창 테두리 스타일 설정
    messageContainer.appendChild(messageDiv);
    document.body.appendChild(messageContainer);
    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 1000); // 메시지를 1초 후에 자동으로 삭제
}
