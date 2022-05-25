//Game Values
let min = 1,
  max = 10,
  winningNumber = getRandomNumber(min, max),
  remainingGuesses = 5;

//UI Elements
const minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guesses = document.querySelector(".remaining-guesses"),
  submit = document.getElementById("submit-btn"),
  variable = document.querySelector(":root"),
  game = document.querySelector(".user-guess"),
  userInput = document.querySelector("#guessed-number");

//Assign UI min, max, remaining guesses and css variables
minNum.textContent = min;
maxNum.textContent = max;
guesses.textContent = remainingGuesses;
variableStyles = getComputedStyle(variable);

//listeners
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".msg-container").style.display = "none";
});
submit.addEventListener("click", guessedNumber);
game.addEventListener("mouseup", function (e) {
  if (e.target.className === "play-again") {
    document.querySelector(".msg-container").style.display = "none";
    window.location.reload();
  }
});

//ّFunctions
function guessedNumber() {
  userInputNum = Number(userInput.value);
  if (
    userInputNum > max ||
    userInputNum < min ||
    !Number.isInteger(userInputNum)
  ) {
    setMessage(
      false,
      `Please enter an integer number between ${min} - ${max}`,
      variableStyles.getPropertyValue("--red")
    );
    setTimeout(hideMessage, 2000);
  } else {
    if (userInputNum === winningNumber) {
      setMessage(
        true,
        "congratulations😍 You win👏",
        variableStyles.getPropertyValue("--cyan")
      );
    } else {
      remainingGuesses -= 1;
      guesses.textContent = remainingGuesses;
      if (remainingGuesses === 0) {
        setMessage(
          true,
          `Game Over😟 The correct number was ${winningNumber}`,
          variableStyles.getPropertyValue("--red")
        );
      } else {
        setMessage(
          false,
          `${userInputNum} is not correct! Try again`,
          variableStyles.getPropertyValue("--red")
        );
        setTimeout(hideMessage, 1000);
      }
    }
  }
  userInput.value = "";
  userInput.focus();
}
function setMessage(gameFinished, msg, color) {
  gameFinished === true &&
    ((submit.value = "play again"),
    (submit.className += "play-again"),
    (userInput.disabled = true));
  let message = document.querySelector(".msg");
  document.querySelector(".msg-container").style.display = "block";
  message.textContent = msg;
  message.style.color = color;
}
function hideMessage() {
  document.querySelector(".msg-container").style.display = "none";
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
