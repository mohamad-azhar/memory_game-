"use strict";

const gameBoard = document.querySelector("#game-board");
const movesElement = document.querySelector("#moves");
const timerElement = document.querySelector("#timer");
const restartButton = document.querySelector("#restart-button");

console.log("Memory Game is correct geladen:)");

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


function shuffleCards(cards){
    return cards.sort(function() {
        return Math.random() -0.5;
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

    if (card === firstCard) {
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
    
    resetSelectedBoard();
}

function hideCardsAgain() {
    boardLocked = true;
    
    setTimeout(function() {
        firstCard.textContent = "?";
        secondCard.textContent = "?";

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetSelectedBoard();
    }, 1000);
}

function resetSelectedBoard() {
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

        card.addEventListener("click", function() {
            flipCard(card);
        });
        gameBoard.appendChild(card);
    });
}

function restartGame() {
    moves = 0;
    movesElement.textContent = "0";
    timerElement.textContent = "0";

    firstCard = null;
    secondCard = null;
    boardLocked = false;
    createGameBoard();
}



restartButton.addEventListener("click", function(){
    movesElement.textContent = "0";
    timerElement.textContent = "0:00";

    console.log("Het spel werd opnieuw gestart!");
});


createGameBoard();