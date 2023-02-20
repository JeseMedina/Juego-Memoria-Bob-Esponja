const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const gameBoard = document.querySelector(".game-board");
const attemptsValue = document.getElementById("attempts-counter")

let cardsArray = [];
let flippedCards = [];
let matchedCards = [];
let cardFlipping = false;
let flippedCardsCount = 0;
let attempts = 0;

// Crea la grilla de juego
function createGameBoard() {
  for (let i = 1; i <= 8; i++) {
    cardsArray.push(i);
    cardsArray.push(i);
  }

  shuffleCards(cardsArray);

  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-card-value", cardsArray[i]);
    card.style.backgroundImage = 'url(images/front.png)';
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  }
  startButton.remove();
}

// Mezcla las cartas
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Voltea la carta
function flipCard() {
  if (cardFlipping) return;
  if (this === flippedCards[0]) return;
  this.style.backgroundImage = `url(images/${this.getAttribute("data-card-value")}.jpg)`;

  if (flippedCards.length === 0) {
    flippedCards.push(this);
    return;
  } else {
    cardFlipping = true;
    flippedCards.push(this);

    if (flippedCards[0].getAttribute("data-card-value") === flippedCards[1].getAttribute("data-card-value")) {
      matchedCards.push(flippedCards[0]);
      matchedCards.push(flippedCards[1]);
      flippedCards = [];
      cardFlipping = false;
      checkWin();
      return;
    } else {
      setTimeout(() => {
        flippedCards[0].style.backgroundImage = "url(images/front.png)";
        flippedCards[1].style.backgroundImage = "url(images/front.png)";
        flippedCards = [];
        cardFlipping = false;
      }, 1500);
    }
  }
  attempts++;
  attemptsValue.textContent = attempts;
}

// Revisa si se ganó el juego
function checkWin() {
  if (matchedCards.length === cardsArray.length) {
    alert(`Ganaste con ${attempts} errores! `);
    resetGameBoard();
  }
}

// Reinicia la grilla de juego
function resetGameBoard() {
  gameBoard.innerHTML = "";
  cardsArray = [];
  flippedCards = [];
  matchedCards = [];
  cardFlipping = false;
  attempts = 0;
  attemptsValue.textContent = attempts;
  createGameBoard();
}

// Event listeners para los botones
startButton.addEventListener("click", createGameBoard);
resetButton.addEventListener("click", (resetGameBoard));
