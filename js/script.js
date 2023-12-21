const cardsData = [
  { id: 1, image: "./images/absol.png" },
  { id: 2, image: "./images/charizard.png" },
  { id: 3, image: "./images/dragonite.png" },
  { id: 4, image: "./images/lapras.png" },
  { id: 5, image: "./images/moltres.png" },
  { id: 6, image: "./images/mudkip.png" },
  { id: 7, image: "./images/pikachu.png" },
  { id: 8, image: "./images/piplup.png" },
  { id: 9, image: "./images/shinx.png" },
  { id: 10, image: "./images/zapdos.png" },
];

let turns = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function startGame() {
  turns = 0;
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";

  const cardPairs = generateCardPairs(cardsData);
  const shuffledCards = shuffle([...cardPairs, ...cardPairs]);

  shuffledCards.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = cardData.id;

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = `<img src="./images/back.png" alt="Back of Card">`; // Use a placeholder for the card back

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerHTML = `<img src="${cardData.image}" alt="Card ${cardData.id}" style="visibility: hidden;">`;

    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener("click", flipCard);
    gameArea.appendChild(card);
  });

  document.getElementById("start-btn").textContent = "Reset";
  document.getElementById("start-btn").removeEventListener("click", startGame);
  document.getElementById("start-btn").addEventListener("click", resetGame);
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    toggleVisibility(firstCard.querySelector(".card-back img"));
    return;
  }

  secondCard = this;
  toggleVisibility(secondCard.querySelector(".card-back img"));
  checkForMatch();
}

function toggleVisibility(element) {
  element.style.visibility =
    element.style.visibility === "hidden" ? "visible" : "hidden";
}

function checkForMatch() {
  turns++;
  const cards = document.querySelectorAll(".card.flip");
  const [card1, card2] = cards;

  if (card1.dataset.id === card2.dataset.id) {
    disableCards(cards);
  } else {
    unflipCards(cards);
  }
}

function disableCards(cards) {
  cards.forEach((card) => {
    card.removeEventListener("click", flipCard);
    card.style.visibility = "hidden";
    const cardBackImg = card.querySelector(".card-back img");
    cardBackImg.style.visibility = "hidden";
    card.remove();
  });

  resetBoard();
}

function unflipCards(cards) {
  lockBoard = true;

  setTimeout(() => {
    cards.forEach((card) => {
      if (!card.classList.contains("matched")) {
        card.classList.remove("flip");
        toggleVisibility(card.querySelector(".card-back img"));
      }
    });

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetGame() {
  const gameArea = document.getElementById("game-area");
  gameArea.innerHTML = "";

  document.getElementById("start-btn").textContent = "Start";
  document.getElementById("start-btn").removeEventListener("click", resetGame);
  document.getElementById("start-btn").addEventListener("click", startGame);
}

document.getElementById("start-btn").addEventListener("click", startGame);

function generateCardPairs(cardsData) {
  const cardPairs = [];
  cardsData.forEach((cardData, index) => {
    cardPairs.push({ id: index, image: cardData.image });
  });
  return cardPairs;
}

function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
