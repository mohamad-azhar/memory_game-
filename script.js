"use strict";

const gameBoard = document.querySelector("#game-board");
const movesElement = document.querySelector("#moves");
const timerElement = document.querySelector("#timer");
const restartButton = document.querySelector("#restart-button");

console.log("Memory Game is correct geladen :)");

const cardSymbols = [
    "🍎",
    "🍌",
    "🍇",
    "🍓",
    "🍎",
    "🍌",
    "🍇",
    "🍓"
];

let firstCard = null;
let secondCard = null;
let boardLocked = false;
let moves = 0;
let matchedPairs = 0;

function shuffleCards(cards) {
    return cards.sort(function () {
        return Math.random() - 0.5;
    });
}

function flipCard(card) {
    if (boardLocked) {
        return;
    }

    if (card === firstCard) {
        return;
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

    setTimeout(function () {
        alert("Proficiat! Je hebt gewonnen in " + moves + " zetten.");
    }, 300);
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
    moves = 0;
    matchedPairs = 0;
    
    movesElement.textContent = "0";
    timerElement.textContent = "0";

    firstCard = null;
    secondCard = null;
    boardLocked = false;

    createGameBoard();

    console.log("Het spel werd opnieuw gestart!");
}

restartButton.addEventListener("click", restartGame);

createGameBoard();