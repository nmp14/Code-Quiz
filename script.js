let highScores = document.getElementById("high-scores");
let timeCounter = document.getElementById("time-count");
let container = document.getElementById("quiz-container");
let startBtn = document.getElementById("start-button");
let newBtn = document.createElement("button");
let h1 = document.querySelector("h1");
let questions = document.getElementById("question-content");
let answerDiv = document.createElement("div");
let answer;

function questionOne() {
    h1.innerHTML = "What is the output of the following code?";
    questions.innerHTML = `<pre class="text-light">
    function vowelCount(string) {
        //vowels with fun face values.
        let vowels = { a: ':)', e: ':3', i: ':(', o: 'hello', u: '0.0' };
        let count = 0;
        string.split('').forEach(letter => {
            if (letter in vowels) {
                count++;
            }
        })
        return count;
    }
    console.log("hello");
    </pre>`
    questions.style.backgroundColor = "#666";

    answers = ["a) :(", "b) :)", "c) undefined", "d) 2", "e) 5"];

    // Create ul and answers.
    answerDiv.setAttribute('class', 'answers');
    container.appendChild(answerDiv);
    generateAnswers(answers);
    // Generate button for submitting
    addButton();
}

function start() {
    // Hide the start button
    startBtn.style.display = "none";
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

function generateAnswers(answers) {
    let html = '<ul>'
    answers.forEach(element => {
        html += '<li><button class="btn text-light">' + element + '</button></li>';
    });
    html += '</ul>';
    answerDiv.innerHTML = html;
}

startBtn.addEventListener("click", start);