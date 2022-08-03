/**
 * Game Rules/Function :
 * - Player must guess a number between min and max
 * - Player gets a certain amount of guesses
 * - Notify player of guesses remaining
 * - Notify the player of the correct answer if lose
 * - Let player choose to play again
 */

// min, max, winning number and guesses left value
let min = 1,
  max = 10,
  winningNumber = getRandomNumber(min, max),
  guessesLeft = 3;

// UI Elements
const gameWrapper = document.querySelector(".game-wrapper"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessInput = document.querySelector(".guess-input"),
  guessBtn = document.querySelector("button"),
  message = document.querySelector(".message");

// assign value
minNum.textContent = min;
maxNum.textContent = max;

// reload the page when player click play again button
gameWrapper.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// get random number
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Submit guess
guessBtn.addEventListener("click", function () {
  let guessValue = parseInt(guessInput.value);

  // validate
  if (isNaN(guessValue) || (guessValue < min) | (guessValue > max)) {
    setMessage(`Please enter a number between ${min} and ${max}`, "error");
  }

  // if won
  if (guessValue === winningNumber) {
    gameOver(`${guessValue} is correct, YOU WIN!`, "success");
  } else {
    // if user didn't answer correctly, reduce the guessesLeft
    guessesLeft -= 1;

    // guesses left is 0, game over
    if (guessesLeft === 0) {
      gameOver(`Game over, the correct answer is ${winningNumber}`, "error");
    } else {
      setMessage(
        `${guessValue} is not correct, ${guessesLeft} guesses left`,
        "error"
      );

      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(msg, type) {
  guessInput.disabled = true;
  setMessage(msg, type);

  // set the button value to play again
  guessBtn.textContent = "Play again";
  guessBtn.className += "play-again";
}

// flash message
function setMessage(msg, type) {
  let color;

  if (type === "success") {
    color = "#23FD7A";
  } else if (type === "error") {
    color = "#FD234A";
  }

  message.style.color = color;
  message.style.display = "inline-block";
  gameWrapper.style.border = `1px solid ${color}`;
  message.textContent = msg;
}
