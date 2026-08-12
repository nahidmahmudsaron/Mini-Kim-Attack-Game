// Get HTML elements

const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const message = document.getElementById("message");


// Game variables

let score = 0;
let timeLeft = 20;
let gameRunning = false;

let timer;


// Start Game

startButton.addEventListener("click", function () {

    if (gameRunning) {
        return;
    }

    // Reset game
    score = 0;
    timeLeft = 20;
    gameRunning = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    message.textContent = "";

    startButton.textContent = "🎮 Game Running...";
    startButton.disabled = true;


    // Create first target
    createTarget();


    // 20-second countdown

    timer = setInterval(function () {

        timeLeft--;

        timeDisplay.textContent = timeLeft;


        // Game Over

        if (timeLeft <= 0) {

            clearInterval(timer);

            gameRunning = false;

            removeAllTargets();

            message.textContent =
                "💀 Game Over! Final Score: " + score;

            startButton.textContent =
                "▶ Start Game";

            startButton.disabled = false;
        }

    }, 1000);

});


// Create Target

function createTarget() {

    if (!gameRunning) {
        return;
    }


    // Create target container

    const target =
        document.createElement("div");

    target.classList.add("target");


    // Create image

    const image =
        document.createElement("img");

    image.src = "target.jpg";

    image.alt = "Target";


    // Put image inside target

    target.appendChild(image);


    // Random position

    const maxX =
        gameArea.clientWidth - 75;

    const maxY =
        gameArea.clientHeight - 75;

    const randomX =
        Math.random() * maxX;

    const randomY =
        Math.random() * maxY;


    target.style.left =
        randomX + "px";

    target.style.top =
        randomY + "px";


    // Click event

    target.addEventListener("click", function () {

        if (!gameRunning) {
            return;
        }


        // Increase score

        score++;

        scoreDisplay.textContent = score;


        // Play victory sound

        const victorySound =
            new Audio("victory.mp3");

        victorySound.play();


        // Remove clicked target

        target.remove();

    });


    // Add target to game area

    gameArea.appendChild(target);


    // Automatically remove target

    setTimeout(function () {

        if (target.parentElement) {

            target.remove();

        }

    }, 1200);

}


// Create new targets repeatedly

setInterval(function () {

    if (gameRunning) {

        createTarget();

    }

}, 1000);


// Remove all targets

function removeAllTargets() {

    gameArea.textContent = "";

}