// Listens for the DOMContentLoaded event to ensure the script runs after the HTML document's content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Array containing URLs for different Pokemon images
  const images = [
    "./images/pokemon1.png",
    "./images/pokemon2.png",
    "./images/pokemon3.png",
    "./images/pokemon4.png",
    "./images/pokemon5.png",
    "./images/pokemon6.png",
    "./images/pokemon7.png",
    "./images/pokemon8.png",
    "./images/pokemon9.png",
    "./images/pokemon10.png",
  ];

  // Variable to keep track of the number of turns taken in the game
  let turnCount = 0;

  // Reference to the element in HTML
  const turnCounterDisplay = document.getElementById("turn-counter");
  const gameArea = document.getElementById("game-area");
  const startBtn = document.getElementById("start-btn");

  // Arrays to hold chosen cards and their IDs
  let cardsChosen = [];
  let cardsChosenId = [];

  // Array to store cards that have been successfully matched
  let cardsWon = [];

  // Double the images array to create pairs
  const doubledImages = images.concat(images);

  // Function to shuffle the order of images randomly
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

  // Function to create the game board dynamically
  function createBoard() {
    const shuffledImages = shuffle(doubledImages);
    for (let i = 0; i < shuffledImages.length; i++) {
      const card = document.createElement("div"); // Create a card element
      card.classList.add("card"); // Add a CSS class to the card element
      card.setAttribute("data-id", i); // Set a data attribute for the card

      // Create back element for each card as an image
      const back = document.createElement("img");
      back.classList.add("back"); // Add a CSS class to the image element
      back.src = "./images/card.png"; // Set the image source for the back of the card
      back.setAttribute("data-image", shuffledImages[i]); // Set a data attribute for the image

      // Append the image to the card element
      card.appendChild(back);

      // Add a click event listener to the card
      card.addEventListener("click", flipCard);

      // Append the card to the game area
      gameArea.appendChild(card);
    }

    // Change the Start button to a Restart button after the board is loaded
    startBtn.textContent = "Restart";

    // Remove the startGame event listener and add the restartGame event listener to the Start button
    startBtn.removeEventListener("click", startGame);
    startBtn.addEventListener("click", restartGame);
  }

  // Function to hide a paragraph of text in the game
  function hideParagraphText() {
    const paragraph = document.querySelector(".game-paragraph");
    paragraph.style.display = "none"; // Hide the paragraph by setting its display style to "none"
  }

  // Function to check for matching cards
  function checkForMatch() {
    const allCards = document.querySelectorAll(".card");

    // Destructuring assignment to get the IDs and chosen cards
    const [optionOneId, optionTwoId] = cardsChosenId;
    const [optionOne, optionTwo] = cardsChosen;

    // Get specific card elements using their IDs
    const cardOne = allCards[optionOneId];
    const cardTwo = allCards[optionTwoId];

    // Get the back images of the chosen cards
    const backOne = cardOne.querySelector(".back");
    const backTwo = cardTwo.querySelector(".back");

    // Check if the chosen cards match
    if (optionOne === optionTwo && optionOneId !== optionTwoId) {
      // Push the matched cards' IDs to the cardsWon array
      cardsWon.push(optionOneId, optionTwoId);

      // Reset chosen cards and IDs arrays
      cardsChosen = [];
      cardsChosenId = [];

      // Apply CSS class for animation to the matched cards
      cardOne.classList.add("reverse-flip");
      cardTwo.classList.add("reverse-flip");

      // Hide matched cards from the board
      cardOne.style.visibility = "hidden";
      cardTwo.style.visibility = "hidden";
    } else {
      // Increment turn count for unsuccessful match
      turnCount++;
      turnCounterDisplay.textContent = `Turns: ${turnCount}`;

      // Delay before flipping the unmatched cards back
      setTimeout(() => {
        cardOne.classList.remove("flip");
        cardTwo.classList.remove("flip");
        cardOne.classList.add("reverse-flip");
        cardTwo.classList.add("reverse-flip");
        backOne.src = "./images/card.png";
        backTwo.src = "./images/card.png";
        cardsChosen = [];
        cardsChosenId = [];
      }, 1000);
    }

    // Alert the player if the maximum number of turns is reached
    if (turnCount >= 20) {
      alert(
        "Better luck next time. You've reached the maximum number of turns."
      );
      endGame();
    }

    // Checks if the number of cards won is equal to the total number of doubled images
    if (cardsWon.length === doubledImages.length) {
      setTimeout(() => {
        let message = "";

        // else if statements for winning conditions based on the number of turns
        if (turnCount <= 8) {
          message = `Wow that's amazing! your total moves was only: ${turnCount}`;
        } else if (turnCount <= 11) {
          message = `Very good! your total moves was: ${turnCount}`;
        } else if (turnCount <= 15) {
          message = `Not bad. your total moves was: ${turnCount}`;
        } else {
          message =
            "Aw! you reached the maximum number of moves, better luck next time";
        }

        // Shows and alert to the player based on the number of turns
        alert(`${message}`);
        // Call endGame function on a delay to end the game after displaying alert message
        endGame();
      }, 1000);
    }
  }

  // Function to flip a card when clicked
  function flipCard() {
    const cardId = this.getAttribute("data-id");
    const back = this.querySelector(".back");

    // Check if the card is already flipped or if two cards are already chosen
    if (!this.classList.contains("flip") && cardsChosen.length < 2) {
      this.classList.add("flip"); // Apply CSS class for flipping animation
      cardsChosen.push(doubledImages[cardId]); // Push the chosen card to the array
      cardsChosenId.push(cardId); // Push the chosen card's ID to the array

      back.src = back.getAttribute("data-image"); // Change the card image to the chosen Pokemon image

      // Check if two cards are chosen, then check for a match
      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }

  // Function to start the game
  function startGame() {
    hideParagraphText();
    turnCounterDisplay.style.display = "inline";
    gameArea.innerHTML = "";
    createBoard();
  }

  // Function to restart the game
  function restartGame() {
    turnCount = 0;
    turnCounterDisplay.textContent = `Turns: ${turnCount}`;

    // Resets and clears variables & array
    cardsChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    gameArea.innerHTML = "";
    // Calls the function to create the game board
    createBoard();
  }

  // Function to end the game
  function endGame() {
    const paragraph = document.querySelector(".game-paragraph");
    paragraph.style.display = "block"; // Makes the game paragraph visible
    gameArea.innerHTML = ""; // Clears the game area
    turnCounterDisplay.style.display = "none"; // Hides the turn counter display
    startBtn.textContent = "Start"; // Changes the Start button text
    startBtn.removeEventListener("click", restartGame); // Removes event listener for restartGame
    startBtn.addEventListener("click", startGame); // Adds event listener for startGame
    turnCount = 0;
    turnCounterDisplay.textContent = `Turns: ${turnCount}`; // Updates the turn counter display
  }

  // Event listener for Start button
  startBtn.addEventListener("click", startGame);
});
