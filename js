let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const lapTimesList = document.getElementById('lap-times');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
});

document.getElementById('pause').addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapTimesList.innerHTML = '';
});

document.getElementById('lap').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('li');
        lapTime.textContent = formatTime(elapsedTime);
        lapTimesList.appendChild(lapTime);
    }
});
