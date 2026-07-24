"use strict";

const gameBoard = document.querySelector("#game-board");
const movesElement = document.querySelector("#moves");
const timerElement = document.querySelector("#timer");
const restartButton = document.querySelector("#restart-button");

console.log("Memory Game is correct geladen:)");


restartButton.addEventListener("click", function(){
    movesElement.textContent = "0";
    timerElement.textContent = "0:00";

    console.log("Het spel werd opnieuw gestart!");
});
