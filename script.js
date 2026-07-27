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

function shuffleCards(cards){
    return cards.sort(function() {
        return Math.random() -0.5;
    });
}

function flipCard(card) { 
    card.textContent = card.dataset.symbol;
    card.classList.add("flipped");
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
    movesElement.textContent = "0";
    timerElement.textContent = "0";

    createGameBoard();
}



restartButton.addEventListener("click", function(){
    movesElement.textContent = "0";
    timerElement.textContent = "0:00";

    console.log("Het spel werd opnieuw gestart!");
});


createGameBoard();