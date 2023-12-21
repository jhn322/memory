document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./images/absol.png",
    "./images/charizard.png",
    "./images/dragonite.png",
    "./images/lapras.png",
    "./images/moltres.png",
    "./images/mudkip.png",
    "./images/pikachu.png",
    "./images/piplup.png",
    "./images/shinx.png",
    "./images/zapdos.png",
  ];

  let turnCount = 0; // Initialize the turn counter
  const turnCounterDisplay = document.getElementById("turn-counter");

  const gameArea = document.getElementById("game-area");
  const startBtn = document.getElementById("start-btn");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  // Double the images array to create pairs
  const doubledImages = images.concat(images);

  // Shuffle images
  function shuffle(array) {
    let currentIndex = array.length,
      temp,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  // Create the game board
  function createBoard() {
    const shuffledImages = shuffle(doubledImages);
    for (let i = 0; i < shuffledImages.length; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-id", i);

      // Create back element for each card as an image
      const back = document.createElement("img");
      back.classList.add("back");
      back.src = "./images/card.png"; // Set a blank image initially
      back.setAttribute("data-image", shuffledImages[i]); // Store the actual image path as a data attribute
      card.appendChild(back);

      card.addEventListener("click", flipCard);
      gameArea.appendChild(card);
    }

    // Change the Start button to a Restart button after the board is loaded
    startBtn.textContent = "Restart";
    startBtn.removeEventListener("click", startGame);
    startBtn.addEventListener("click", restartGame);
  }

  // Hide the paragraph text
  function hideParagraphText() {
    const paragraph = document.querySelector(".game-paragraph");
    paragraph.style.display = "none";
  }

  // Check for matches
  function checkForMatch() {
    const allCards = document.querySelectorAll(".card");
    const [optionOneId, optionTwoId] = cardsChosenId;
    const [optionOne, optionTwo] = cardsChosen;

    const cardOne = allCards[optionOneId];
    const cardTwo = allCards[optionTwoId];
    const backOne = cardOne.querySelector(".back");
    const backTwo = cardTwo.querySelector(".back");

    if (optionOne === optionTwo && optionOneId !== optionTwoId) {
      cardsWon.push(optionOneId, optionTwoId);
      cardsChosen = [];
      cardsChosenId = [];

      // Remove matched cards from the board
      cardOne.style.visibility = "hidden";
      cardTwo.style.visibility = "hidden";
    } else {
      turnCount++; // Increment the turn counter on mismatch
      turnCounterDisplay.textContent = `Turns: ${turnCount}`;
      setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        backOne.src = "./images/card.png";
        backTwo.src = "./images/card.png";
        cardsChosen = [];
        cardsChosenId = [];
      }, 1000);
    }

    if (cardsWon.length === doubledImages.length) {
      setTimeout(() => {
        alert("Congratulations! You found all the matches!");
        gameArea.innerHTML = "";
        createBoard();
      }, 500); // Delay the alert by 500 milliseconds (adjust as needed)
    }
  }

  // Flip the card
  function flipCard() {
    const cardId = this.getAttribute("data-id");
    const back = this.querySelector(".back");

    // Check if the card is already flipped or if two cards are already chosen
    if (!this.classList.contains("flip") && cardsChosen.length < 2) {
      this.classList.add("flip");
      cardsChosen.push(doubledImages[cardId]);
      cardsChosenId.push(cardId);

      back.src = back.getAttribute("data-image"); // Set image source when flipped

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Function to start the game
  function startGame() {
    hideParagraphText();
    gameArea.innerHTML = ""; // Clear existing game board
    createBoard();
  }

  // Function to restart the game
  function restartGame() {
    turnCount = 0;
    turnCounterDisplay.textContent = `Turns: ${turnCount}`;

    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    gameArea.innerHTML = ""; // Clear existing game board
    createBoard();
  }

  // Event listener for Start button
  startBtn.addEventListener("click", startGame);
});
