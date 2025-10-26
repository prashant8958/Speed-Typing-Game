const instructionPage = document.getElementById('instructionPage');
const gamePage = document.getElementById('gamePage');
const circle = document.getElementById('circle');
const letterspan = document.getElementById('letter');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('finalScore');
const scoreContainer = document.getElementById('scoreContainer');
const gameOverPage = document.getElementById('gameOverPage');
const gamePrompt = document.getElementById('gamePrompt');
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let currentLetter = '';
let autoChangeTimer = null;
let score = 0;
let timerDuration = 5000; 

function startGame() {
    instructionPage.classList.add('hidden');
    gamePage.style.display = 'block';
    gameOverPage.classList.add('hidden');
    score = 0;
    timerDuration = 5000;
    scoreSpan.textContent = score;
    gamePrompt.textContent = "Press the key that matches the letter!";
    currentLetter = getRandomLetter(null);
    letterspan.textContent = currentLetter;
    startAutoChange();
}

function startAutoChange() {
    if (autoChangeTimer) {
        clearInterval(autoChangeTimer);
    }
    autoChangeTimer = setInterval(() => {
        currentLetter = getRandomLetter(currentLetter);
        letterspan.textContent = currentLetter;
    }, timerDuration);
}

function stopAutoChange() {
    if (autoChangeTimer) {
        clearInterval(autoChangeTimer);
        autoChangeTimer = null;
    }
}

function endGame() {
    stopAutoChange();
    gamePage.style.display = 'none';
    gameOverPage.classList.add('hidden');
    instructionPage.classList.remove('hidden');
}

function gameOver() {
    stopAutoChange();
    gamePage.style.display = 'none';
    finalScoreSpan.textContent = score;
    gameOverPage.classList.remove('hidden');
}

function restartGame() {
    gameOverPage.classList.add('hidden');
    instructionPage.classList.remove('hidden');
}

function getRandomLetter(previous) {
    let newLetter;
    do {
        newLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    } while (newLetter === previous);
    return newLetter;
}

function flashcolor(className) {
    circle.classList.remove('incorrect', 'correct');
    circle.classList.add(className);
    setTimeout(() => {
        circle.classList.remove(className);
    }, 500);
}

function handleKey(key) {
    if (gamePage.style.display !== 'block') return;
    key = key.toLowerCase();
    if (!key.match(/^[a-z]$/)) {
        flashcolor("incorrect");
        return;
    }
    if (key === currentLetter.toLowerCase()) {
        flashcolor("correct");
        score++;
        scoreSpan.textContent = score;
        // Every 10 points, decrease timer by 1s (minimum 1s)
        let newTimer = 5000 - Math.floor(score / 10) * 1000;
        if (newTimer < 1000) newTimer = 1000;
        if (newTimer !== timerDuration) {
            timerDuration = newTimer;
            startAutoChange();
        }
        currentLetter = getRandomLetter(currentLetter);
        letterspan.textContent = currentLetter;
    } else {
        flashcolor("incorrect");
        gamePrompt.textContent = "Wrong key! Game Over.";
        setTimeout(gameOver, 600); // Allow time for the flash effect
    }
}

document.addEventListener('keydown', (e) => {
    handleKey(e.key);
});
