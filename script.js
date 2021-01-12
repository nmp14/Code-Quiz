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
let buttonCount = 1;

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
    // Generate button for submitting. First time running will cause it to have an id of submit1.
    addButton();
    let submitBtn1 = document.getElementById("submit1");
    // Submit on click and check score
    submitBtn1.addEventListener("click", function questionOneCheck() {
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
        this.removeEventListener("click", questionOneCheck);
        questionTwo();
    });
}


function questionTwo() {
    // same functionality as question one overall
    takingQuiz = true;
    console.log(score);
    h1.innerHTML = "what is the correct syntax for an object?";
    questions.innerHTML = `<pre class="text-light">
    a) obj = {
        batteryLevel: 100%,
        model: iphone 11
    };
    b) obj = [
        batterLevel: 100%.
        mode: iphone 11
    ];
    c) obj = {
        batteryLevel = 100%,
        model: iphone 11
    };
    d) obj = [
        batteryLevel = 100%,
        model: iphone 11
    ];
    e) obj = {
        batteryLevel: 100%
        model: iphone 11
    }; </pre>`

    answers = ["a", "b", "c", "d", "e"];

    generateRadio(answers);
    // Second time running addButton will have an id of submit2.
    addButton();
    let submitBtn2 = document.getElementById("submit2");

    // Submit on click and check score
    submitBtn2.addEventListener("click", function questionTwoCheck() {
        if (document.getElementById("a").checked && takingQuiz === true) {
            score++;
        } else if (!document.getElementById("a").checked && takingQuiz === true) {
            score--;
            if (score < 0) {
                score = 0;
            }
        }
        takingQuiz = false;
        //this.removeEventListener("click", questionTwoCheck);
        // Call question three after finished checking question one
        questionThree();
        this.removeEventListener("click", questionTwoCheck);
    });
}

function questionThree() {
    console.log(score);
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
    newBtn.setAttribute("id", "submit" + `${buttonCount}`);
    container.appendChild(newBtn);
    buttonCount++;
}

function generateRadio(answers) {
    output = ""
    for (var i = 0; i < answers.length; i++) {
        answer = answers[i].split(")");
        answerKey = answer[0];
        if (answer[1] !== undefined) {
            output += '<input class="form-check-input mb-2" id=' + answerKey + ' type="radio" value="yes" name="box2"> '
                + `<label class="form-check-label mb-2" for=${answerKey}>` + answerKey + ') ' + answer[1] + '</label><br>';
            document.getElementById("radioBtn").innerHTML = output;
        } else {
            output += '<input class="form-check-input mb-2" id=' + answers[i] + ' type="radio" value="yes" name="box2"> '
                + `<label class="form-check-label mb-2" for=${answers[i]}>` + answers[i] + '</label><br>';
            document.getElementById("radioBtn").innerHTML = output;
        }
    }
}

startBtn.addEventListener("click", start);