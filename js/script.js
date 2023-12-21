const cards = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
  "I",
  "I",
  "J",
  "J",
];

let hasFlippedCards = false;
let lockBoard = false;
let firstCard, secondCard;

const gameArea = document.getElementById("game-area");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", startGame);

// Reset board
function startGame() {
  gameArea.innerHTML = "";
  resetBoard();

  // Shuffle cards
  const shuffleCards = shuffle(cards);
  shuffleCards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card", "back");
    cardElement.dataset.card = card;
    cardElement.addEventListener("click", flipCard);
    gameArea.appendChild(cardElement);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCards) {
    hasFlippedCards = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCards, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
