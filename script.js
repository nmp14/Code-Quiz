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
// Counter for addButton() function. Allows for setting unique ids.
let buttonCount = 1;
// Variable for entering name at end of quiz
let username = "";

// Generate question one
function questionOne() {
    h1.innerHTML = "What is the output of the following code?";
    questions.innerHTML = `<pre class="text-light text-left">
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

    // Array of answer choices
    answers = ["a) :3", "b) :(", "c) undefined", "d) 2", "e) 5"];

    // Create radio options for user to select answers.
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
        // Call question two after finished checking question one and remove event listener.
        this.removeEventListener("click", questionOneCheck);
        questionTwo();
    });
}


function questionTwo() {
    // same functionality as question one overall
    takingQuiz = true;
    h1.innerHTML = "what is the correct syntax for an object?";
    questions.innerHTML = `<pre class="text-light text-left">
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
        // Call question three after finished checking question one
        questionThree();
        this.removeEventListener("click", questionTwoCheck);
    });
}

function questionThree() {
    takingQuiz = true;
    // Same logic as last two questions other than uses input instead of radio options
    h1.innerHTML = "What is the output of the following code?"
    questions.innerHTML = `<pre class="text-light text-left">
    let max = (numbersArr) => {
        Math.max(...numbersArr)
    }
    console.log([-1, 5, 12, -13]);</pre>`;

    // Create input for user answer instead of radio options.
    document.getElementById("radioBtn").innerHTML = '<label for="q3Answer">Answer</label><br>' +
        `<input type="text" id="q3Answer">`;

    // 3rd run of addButton will have id of submit3
    addButton();

    let submitBtn3 = document.getElementById("submit3");
    submitBtn3.addEventListener("click", function questionThreeCheck() {
        if (document.getElementById("q3Answer").value.toLowerCase() === "undefined") {
            score++;
        } else {
            score--;
            if (score < 0) {
                score = 0;
            }
        }
        takingQuiz = false;
        this.removeEventListener("click", questionThreeCheck);
        questionFour();
    })
}

function questionFour() {
    // Same as one and two
    takingQuiz = true;
    h1.innerHTML = "What is another name for a string in C programming";
    questions.innerHTML = `<pre class="text-light text-left"> 
    a) There is no other name
    b) str
    c) s
    d) char
    e) char * 
    </pre>`;

    answers = ["a", "b", "c", "d", "e"];

    generateRadio(answers);

    // 4th time running will have id of submit4
    addButton();
    let submitBtn4 = document.getElementById("submit4");
    submitBtn4.addEventListener("click", function questionFourCheck() {
        if (document.getElementById("e").checked && takingQuiz === true) {
            score++;
        } else if (!document.getElementById("e").checked && takingQuiz === true) {
            score--;
            if (score < 0) {
                score = 0;
            }
        }
        takingQuiz = false;
        // Call question five after finished checking question one
        this.removeEventListener("click", questionFourCheck);
        questionFive();
    });
}

function questionFive() {
    takingQuiz = true;
    h1.innerHTML = "Is HTML a programming language? True or False"
    questions.innerHTML = "";

    answers = ["true", "false"];

    generateRadio(answers);

    //id of submit5
    addButton();
    let submitBtn5 = document.getElementById("submit5");
    submitBtn5.addEventListener("click", function questionFiveCheck() {
        if (document.getElementById("false").checked && takingQuiz === true) {
            score++;
        } else if (!document.getElementById("false").checked && takingQuiz === true) {
            score--;
            if (score < 0) {
                score = 0;
            }
        }
        takingQuiz = false;
        // End the quiz after question 5
        endQuiz();
        this.removeEventListener("click", questionFiveCheck);
    })
}

function start() {
    // Hide the start button
    startBtn.style.display = "none";
    takingQuiz = true;
    // Start timer
    //...
    // Call question one and change background for its text.
    questions.style.backgroundColor = "#666";
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

function endQuiz() {
    h1.innerHTML = "All done!";
    // Change background of questions to same as page;
    questions.style.backgroundColor = "#555";
    questions.innerHTML = `<pre class="text-light text-left mb-3 pl-3">Your score is: ${score}</pre>`;
    // Create input for user name.
    document.getElementById("radioBtn").innerHTML = '<label for="submission">Enter your name:</label>' + " " +
        `<input type="text" id="submission">`;
    // id of submit6;
    addButton();
    let submitBtn6 = document.getElementById("submit6");
    submitBtn6.addEventListener("click", function () {
        username = document.getElementById("submission").value;
        showScores();
        submitBtn6.remove();
    })
}

function showScores() {
    // Remove html elements no longer needed.
    h1.remove();
    questions.remove();
    form.remove();

    let newh1 = document.createElement("h1");
    newh1.innerHTML = "highscores!"
    newh1.setAttribute("class", "text-light mb-3");
    container.appendChild(newh1);

    // get scores from localStorage if it exists.
    storedList = JSON.parse(localStorage.getItem("scores"));
    let scoreList;
    if (storedList !== null && storedList !== undefined) {
        scoreList = storedList;
    } else {
        scoreList = {};
    }
    scoreList[username] = score;

    // Store to local storage
    storeObj(scoreList);

    let scores = document.createElement("ul");
    container.appendChild(scores);

    for (let person in scoreList) {
        let scoreItem = document.createElement("li");
        scoreItem.innerHTML = person + ": " + scoreList[person];
        scores.appendChild(scoreItem);
    }
}

function storeObj(obj) {
    localStorage.setItem("scores", JSON.stringify(obj));
}

startBtn.addEventListener("click", start);