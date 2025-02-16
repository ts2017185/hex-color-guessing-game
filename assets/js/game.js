/* jshint esversion: 6 */

// Get references to various elements
let timer = document.getElementsByClassName("timer")[0];
let quizContainer = document.getElementById("container");
let nextButton = document.getElementById("next-button");
let numOfQuestions = document.getElementsByClassName("number-of-questions")[0];
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

// Initialize variables
let questionCount;
let scoreCount = 0;
let count;
let countdown;
let selectedTime = parseInt(localStorage.getItem('selectedTime')) || 10; // Default to normal if not set

// Hex codes for color generation
let letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

// Array to store quiz questions
let quizArray = [];

// Function to generate a random value from an array
const generateRandomValue = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Function to generate hex color codes
const colorGenerator = () => {
  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    newColor += generateRandomValue(letters);
  }
  return newColor;
};

// Function to populate options with unique colors
const populateOptions = (optionsArray) => {
  let expectedLength = 4;
  while (optionsArray.length < expectedLength) {
    let color = colorGenerator();
    if (!optionsArray.includes(color)) {
      optionsArray.push(color);
    }
  }
  return optionsArray;
};

// Function to create quiz questions
const populateQuiz = () => {
  for (let i = 0; i < 5; i++) {
    let currentColor = colorGenerator();
    let allColors = [];
    allColors.push(currentColor);
    allColors = populateOptions(allColors);
    quizArray.push({
      id: i,
      correct: currentColor,
      options: allColors,
    });
  }
};

// Next button event listener
nextButton.addEventListener("click", () => displayNext());

// Function to start the timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    timer.innerHTML = `<span>Time Left: </span> ${count}s`;
    count--;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

// Function to display the quiz questions
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  quizCards[questionCount].classList.remove("hide");
};

// Function to display the next question
const displayNext = () => {
  questionCount += 1;
  if (questionCount == quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");

    //User score
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    numOfQuestions.innerHTML =
      questionCount + 1 + " of " + quizArray.length + " Question";
    quizDisplay(questionCount);
    count = selectedTime;
    clearInterval(countdown);
    timerDisplay();
  }
  nextButton.classList.add("hide");
};

// Function to create the quiz and randomly sort questions (colors)
function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);
  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    numOfQuestions.innerHTML = 1 + " of " + quizArray.length + " Question";
    let questionDiv = document.createElement("p");
    questionDiv.classList.add("question");
    questionDiv.innerHTML = `<div class="question-color">${i.correct}</div>`;
    div.appendChild(questionDiv);
    div.innerHTML += `
      <div class="button-container">
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[0]}" data-option="${i.options[0]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[1]}" data-option="${i.options[1]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[2]}" data-option="${i.options[2]}"></button>
      <button class="option-div" onclick="checker(this)" style="background-color: ${i.options[3]}" data-option="${i.options[3]}"></button>
      </div>
    `;
    quizContainer.appendChild(div);
  }
}

// Function to check the selected option
function checker(userOption) {
  let userSolution = userOption.getAttribute("data-option");
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.getAttribute("data-option") === quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
  nextButton.classList.remove("hide");
}

// Initial setup function
function initial() {
  nextButton.classList.add("hide");
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  clearInterval(countdown);
  count = selectedTime;
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

// Restart game
restart.addEventListener("click", () => {
  quizArray = [];
  populateQuiz();
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

// Start game
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  quizArray = [];
  populateQuiz();
  initial();
});

// Return Home button event listener
let returnHomeButton = document.getElementById("return-home");
returnHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
