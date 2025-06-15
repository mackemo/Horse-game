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
