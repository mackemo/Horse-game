const emotionStatements = [
    { text: "Happy", type: "good" },
    { text: "Confident", type: "good" },
    { text: "Calm", type: "good" },
    { text: "Relaxed", type: "good" },
    { text: "Angry", type: "bad" },
    { text: "Sad", type: "bad" },
    { text: "Scared", type: "bad" },
    { text: "Surprised", type: "bad" }
];

const ruleStatements = [
    { text: "Listen to your coach and follow instructions", type: "good" },
    { text: "No running or loud sounds at the barn", type: "good" },
    { text: "Never walk or stand directly behind or in front of the horse", type: "good" },
    { text: "Praise often. Correct seldom. Never punish", type: "good" },
    { text: "Don't wrap or tie anything around your hand or body", type: "good" },
    { text: "Only feed treats in a bucket", type: "good" },
    { text: "Use your hands to spank your horse if he misbehaves", type: "bad" },
    { text: "Tie the lead rope to your wrist so you don't lose your horse", type: "bad" },
    { text: "Shout hello to your coach when you get to the barn", type: "bad" },
    { text: "If your horse is facing away from you, run up behind them and turn them around", type: "bad" },
    { text: "You should run to get your saddle so you aren't late", type: "bad" },
    { text: "Tell your horse he's stupid when he makes a mistake", type: "bad" }
];

// initialize variables
let round = 1;
let current = 0;
let score = 0;
let currentStatements = [];
let inputEnabled = false;

// DOM Elements
const horse = document.getElementById("horse");
const obstacle = document.getElementById("obstacle");
const statementText = document.getElementById("statement");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const startScreen = document.getElementById("start-screen");
const gameArea = document.getElementById("game-area");
const ui = document.getElementById("ui");
const roundIndicator = document.getElementById("round-indicator");
const gameOverScreen = document.getElementById("game-over-screen");
const finalScore = document.getElementById("final-score");
const roundOverlay = document.getElementById("round-transition-overlay");
const progressBarFill = document.getElementById("progress-bar-fill");


// shuffle the statements
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// start game
function startGame() {
    round = 1;
    current = 0;
    score = 0;
    currentStatements = shuffle([...emotionStatements]);
    inputEnabled = true;
  
    // UI reset
    startScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    gameArea.style.display = "block";
    ui.style.display = "block";
    roundIndicator.style.display = "block";
    progressBarFill.style.width = "0%";
  
    resultText.textContent = "";
    statementText.textContent = "";
    scoreText.textContent = "Score: 0";
  
    horse.src = "./images/horse.webp"; // horse image
    resetHorsePosition();
    resetObstacle();
  
    document.addEventListener("keydown", handleKey);
  
    showStatement();
}


// show the statements on screen
function showStatement() {
    if (current < currentStatements.length) {
        statementText.textContent = currentStatements[current].text;
        roundIndicator.textContent = `Round ${round} of 2`;
        resetObstacle();
        resetHorsePosition();
        updateProgressBar();
        inputEnabled = true;
    } else if (round === 1) {
        // Transition to Round 2
        round = 2;
        current = 0;
        inputEnabled = false;
        
        // displays round 2 message
        roundOverlay.style.display = "flex";
        
        // once timer ends, display gone, rule statements shuffled, round 2
        setTimeout(() => {
            roundOverlay.style.display = "none";
            currentStatements = shuffle([...ruleStatements]);
            statementText.textContent = "";
            roundIndicator.textContent = `Round ${round} of 2`;
            progressBarFill.style.width = "0%";
            inputEnabled = true;
            showStatement();
    }, 4000);
    } else {
        // Game Over
        inputEnabled = false;
        document.removeEventListener("keydown", handleKey);
        gameOverScreen.style.display = "block";
        gameArea.style.display = "none"; // game display disappears
        ui.style.display = "none";
        roundIndicator.style.display = "none";
        finalScore.textContent = `Your final score is: ${score} / ${emotionStatements.length + ruleStatements.length}`;
    }
}


// jump or ride choice  
  function makeChoice(choice) {
    if (!inputEnabled || current >= currentStatements.length) return;
    inputEnabled = false;
  
    const isCorrect =
        (currentStatements[current].type === "good" && choice === "jump") ||
        (currentStatements[current].type === "bad" && choice === "ride");
  
    resultText.textContent = "";
  
    // Start obstacle moving downward faster (2s total)
    obstacle.style.animation = "moveObstacleDown 2s linear forwards";
  
    // Sync horse action to start when obstacle near horse (~1s delay)
    setTimeout(() => {
        if (choice === "jump") {
            animateHorseJump();
        } else {
            animateHorseRideAround();
        }
    }, 1000);
  
    // Show results after obstacle passes horse (~2.1s)
    setTimeout(() => {
        if (isCorrect) {
            score++;
            resultText.textContent = "✅ Correct!";
            correctSound.play();
        } else {
            resultText.textContent = "❌ Oops!";
            wrongSound.play();
        }
        scoreText.textContent = `Score: ${score}`;
    }, 2100);
  
    // Next statement after full animation (~2.8s)
    setTimeout(() => {
        current++;
        showStatement();
        resultText.textContent = "";
    }, 2800);
}

// horse jump
function animateHorseJump() {
    horse.src = "./images/horse.webp"; 
    horse.style.animation = "horse-jump 1.8s ease-in-out forwards";
  
    horse.addEventListener(
        "animationend",
        () => {
            horse.src = "./images/horse.webp"; 
            horse.style.animation = "";
            resetHorsePosition();
        },
        { once: true }
    );
}
  
// horse ride around
function animateHorseRideAround() {
    horse.style.transition = "transform 1.5s ease-in-out";
    horse.style.transform = "translateX(80px)"; // Move right (ride around)
    setTimeout(() => {
        horse.style.transform = "translateX(0)"; // Return to original position
    }, 1500);
  }


function resetHorsePosition() {
    horse.style.left = "50%";
    horse.style.bottom = "0";
    horse.style.transform = "translateX(-50%)";
}
  

function resetObstacle() {
    obstacle.style.animation = "none";
    obstacle.style.top = "-100px";
    obstacle.style.left = "50%";
    obstacle.style.transform = "translateX(-50%) scale(0.4)";
}


function updateProgressBar() {
    const total = emotionStatements.length + ruleStatements.length;
    const percent = ((round === 1 ? current : emotionStatements.length + current) / total) * 100;
    progressBarFill.style.width = `${percent}%`;
}

  
function handleKey(event) {
    if (event.key === "ArrowUp") {
        makeChoice("jump");
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        makeChoice("ride");
    }
}