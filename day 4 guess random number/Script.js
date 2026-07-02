// Game Variables
let maxNumber = 100;
let randomNumber;
let score = 0;
let coins = 0;
let lives = 3;
let highScore = localStorage.getItem("highScore") || 0;
let time = 30;
let timer;

document.getElementById("highScore").innerText = highScore;

// Start Game
function startGame() {

    maxNumber = parseInt(document.getElementById("difficulty").value);

    randomNumber = Math.floor(Math.random() * maxNumber) + 1;

    lives = 3;
    time = 30;

    document.getElementById("lives").innerHTML = "❤️❤️❤️";
    document.getElementById("message").innerHTML =
        "Guess a number between 1 and " + maxNumber;

    document.getElementById("guess").value = "";

    startTimer();
}

// Timer
function startTimer() {

    clearInterval(timer);

    document.getElementById("timer").innerText = time;

    timer = setInterval(function () {

        time--;

        document.getElementById("timer").innerText = time;

        if (time <= 0) {

            clearInterval(timer);

            document.getElementById("message").innerHTML =
                "⌛ Time Over!";

            loseLife();
        }

    }, 1000);

}

// Check Guess
function checkGuess() {

    let guess = parseInt(document.getElementById("guess").value);

    if (isNaN(guess)) {

        alert("Enter a valid number");

        return;
    }

    addHistory(guess);

    if (guess == randomNumber) {

        score += 10;
        coins += 5;

        document.getElementById("score").innerText = score;
        document.getElementById("coins").innerText = coins;

        document.getElementById("message").innerHTML =
            "🎉 Correct Guess!";

        if (score > highScore) {

            highScore = score;

            localStorage.setItem("highScore", highScore);

            document.getElementById("highScore").innerText =
                highScore;
        }

        clearInterval(timer);

        setTimeout(startGame, 1500);

    }

    else if (guess < randomNumber) {

        document.getElementById("message").innerHTML =
            "⬆ Too Low";

    }

    else {

        document.getElementById("message").innerHTML =
            "⬇ Too High";

    }

}

// Lose Life
function loseLife() {

    lives--;

    if (lives == 2)
        document.getElementById("lives").innerHTML = "❤️❤️";

    if (lives == 1)
        document.getElementById("lives").innerHTML = "❤️";

    if (lives == 0) {

        document.getElementById("lives").innerHTML = "";

        document.getElementById("message").innerHTML =
            "💀 Game Over";

        clearInterval(timer);

        return;
    }

    time = 30;

    startTimer();

}

// Guess History
function addHistory(value) {

    let list = document.getElementById("history");

    let li = document.createElement("li");

    li.innerHTML = value;

    list.prepend(li);

}

// Theme Toggle
function toggleTheme() {

    document.body.classList.toggle("light");

}

// Reset Game
function resetGame() {

    score = 0;
    coins = 0;

    document.getElementById("score").innerText = score;
    document.getElementById("coins").innerText = coins;

    startGame();

}

// Achievement
function checkAchievement() {

    if (score >= 50) {

        document.getElementById("achievement").innerHTML =
            "🏆 Bronze Player";

    }

    if (score >= 100) {

        document.getElementById("achievement").innerHTML =
            "🥈 Silver Player";

    }

    if (score >= 200) {

        document.getElementById("achievement").innerHTML =
            "🥇 Gold Player";

    }

}

setInterval(checkAchievement, 1000);

// Start
startGame();