let highScores = document.getElementById("high-scores");
let timeCounter = document.getElementById("time-count");
let container = document.getElementById("quiz-container");
let startBtn = document.getElementById("start-button");
let newBtn = document.createElement("button");

function questionOne() {

}

function start() {
    // Hide the start button
    startBtn.style.display = "none";
    // Generate a button for submitting questions.
    addButton();
    // Start timer
    //...
    // Call question one.
    questionOne();
}

function addButton() {
    newBtn.innerHTML = "Submit";
    newBtn.setAttribute("class", "btn my-5 text-light");
    container.appendChild(newBtn);
}

startBtn.addEventListener("click", start);