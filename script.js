let highScores = document.getElementById("high-scores");
let timeCounter = document.getElementById("time-count");
let container = document.getElementById("quiz-container");
let startBtn = document.getElementById("start-button");
let newBtn = document.createElement("button");
let h1 = document.querySelector("h1");
let questions = document.getElementById("question-content");
let form = document.querySelector("form");
let radioInput = document.createElement("input");
let radioLabel = document.createElement("label");

let score = 0;
let takingQuiz = false;

// Generate question one
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

    answers = ["a) :3", "b) :(", "c) undefined", "d) 2", "e) 5"];

    // Create radio options.
    generateRadio(answers);
    // Generate button for submitting
    addButton();

    // Submit on click and check score
    let submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", function () {
        if (document.getElementById("d").checked && takingQuiz === true) {
            score++;
        } else if (!document.getElementById("d").checked && takingQuiz === true) {
            score--;
            if (score < 0) {
                score = 0;
            }
        }
        takingQuiz = false;
        // Call question two after finished checking question one
        questionTwo();
    });
}

function QuestionTwo() {

}

function start() {
    // Hide the start button
    startBtn.style.display = "none";
    takingQuiz = true;
    // Start timer
    //...
    // Call question one.
    questionOne();
}

function addButton() {
    newBtn.innerHTML = "Submit";
    newBtn.setAttribute("class", "btn my-5 text-light");
    newBtn.setAttribute("id", "submit");
    container.appendChild(newBtn);
}

function generateRadio(answers) {
    output = ""
    for (var i = 0; i < answers.length; i++) {
        answer = answers[i].split(")");
        answerKey = answer[0];
        output += '<input class="form-check-input mb-2" id=' + answerKey + ' type="radio" value="yes" name="box2"> '
            + `<label class="form-check-label mb-2" for=${answerKey}>` + answerKey + ') ' + answer[1] + '</label><br>';
        document.getElementById("radioBtn").innerHTML = output;
    }
}

startBtn.addEventListener("click", start);