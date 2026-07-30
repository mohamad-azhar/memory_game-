"use strict";

const gameBoard = document.querySelector("#game-board");
const movesElement = document.querySelector("#moves");
const timerElement = document.querySelector("#timer");
const restartButton = document.querySelector("#restart-button");


const winPopup = document.querySelector("#win-popup");
const finalMovesElement = document.querySelector("#final-moves");
const finalTimeElement = document.querySelector("#final-time");
const playAgainButton = document.querySelector("#play-again-button");
const closePopupButton = document.querySelector("#close-popup");

const difficultySelect = document.querySelector("#difficulty");
const bestScoreElement = document.querySelector("#best-score");

console.log("Memory Game is correct geladen :)");

const allSymbols = [
    "🍎",
    "🍌",
    "🍇",
    "🍓",
    "🍉",
    "🍒",
    "🍍",
    "🥝",
    "🍑",
    "🥥",
    "🍋",
    "🍐",
    "🥭",
    "🍊",
    "🫐",
    "🍈"
];

let cardSymbols = [];

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let moves = 0;
let matchedPairs = 0;
let timer = 0;
let timerInterval = null;
let gameStarted = false;

function createCardSymbols() {
    const numberOfPairs = Number(difficultySelect.value);

    const selectedSymbols = allSymbols.slice(0, numberOfPairs);

    cardSymbols = [...selectedSymbols, ...selectedSymbols];
}

function updateBoardLayout() {
    const numberOfPairs = Number(difficultySelect.value);

    gameBoard.classList.remove(
        "easy",
        "normal",
        "hard",
        "extreme"
    );

    if (numberOfPairs === 4) {
        gameBoard.classList.add("easy");
    } else if (numberOfPairs === 6) {
        gameBoard.classList.add("normal");
    } else if (numberOfPairs === 10) {
        gameBoard.classList.add("hard");
    } else if (numberOfPairs === 14) {
        gameBoard.classList.add("extreme");
    }
}
function getBestScoreKey() {
    return "memory-best-score-" + difficultySelect.value;
}

function loadBestScore() {
    const savedBestScore = localStorage.getItem(getBestScoreKey());

    if (savedBestScore === null) {
        bestScoreElement.textContent = "-";
    } else {
        bestScoreElement.textContent = savedBestScore + " zetten";
    }
}

function saveBestScore() {
    const savedBestScore = localStorage.getItem(getBestScoreKey());

    if (savedBestScore === null || moves < Number(savedBestScore)) {
        localStorage.setItem(getBestScoreKey(), moves);
    }

    loadBestScore();
}

function shuffleCards(cards) {
    return cards.sort(function () {
        return Math.random() - 0.5;
    });
}
function startTimer() {
    timerInterval = setInterval(function () {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

function flipCard(card) {
    if (boardLocked) {
        return;
    }

    if (card === firstCard) {
        return;
    }
    if (!gameStarted) {
    gameStarted = true;
    startTimer();
}

    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");

    if (firstCard === null) {
        firstCard = card;
        return;
    }

    secondCard = card;

    moves++;
    movesElement.textContent = moves;

    checkForMatch();
}

function checkForMatch() {
    const cardsMatch =
        firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (cardsMatch) {
        disableMatchedCards();
    } else {
        hideCardsAgain();
    }
}

function disableMatchedCards() {
    firstCard.disabled = true;
    secondCard.disabled = true;

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    matchedPairs++;

    if (matchedPairs === cardSymbols.length / 2) {
        showWinMessage();
    }
    resetSelectedCards();
}
function showWinMessage() {
    boardLocked = true;

    clearInterval(timerInterval);

    saveBestScore();

    finalMovesElement.textContent = moves;
    finalTimeElement.textContent = timer + " seconden";

    setTimeout(function () {
        winPopup.classList.remove("hidden");
    }, 300);
}
function closeWinPopup() {
    winPopup.classList.add("hidden");
}

function hideCardsAgain() {
    boardLocked = true;

    setTimeout(function () {
        firstCard.textContent = "?";
        secondCard.textContent = "?";

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetSelectedCards();
    }, 1000);
}

function resetSelectedCards() {
    firstCard = null;
    secondCard = null;
    boardLocked = false;
}

function createGameBoard() {
    gameBoard.innerHTML = "";

    createCardSymbols();
    updateBoardLayout();

    const shuffledCards = shuffleCards([...cardSymbols]);

    shuffledCards.forEach(function (symbol) {
        const card = document.createElement("button");

        card.classList.add("card");
        card.setAttribute("type", "button");
        card.dataset.symbol = symbol;
        card.textContent = "?";

        card.addEventListener("click", function () {
            flipCard(card);
        });

        gameBoard.appendChild(card);
    });
}
function restartGame() {
    clearInterval(timerInterval);

    timer = 0;
    moves = 0;
    matchedPairs = 0;

    gameStarted = false;

    timerElement.textContent = "0";
    movesElement.textContent = "0";

    firstCard = null;
    secondCard = null;
    boardLocked = false;

    closeWinPopup();
    createGameBoard();
    loadBestScore();
    

    console.log("Het spel werd opnieuw gestart!");
}

restartButton.addEventListener("click", restartGame);
playAgainButton.addEventListener("click", restartGame);

closePopupButton.addEventListener("click", function () {
    closeWinPopup();
});

difficultySelect.addEventListener("change", restartGame);

createGameBoard();
loadBestScore();