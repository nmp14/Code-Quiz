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
let submitBtn;

let score = 0;
// Variable for entering name at end of quiz
let username = "";
// Timer
let timeRemaining = 60;
let interval;
// obj to determine if questions have been answered. Will be used to tally unanswered questions if timed out.
let answeredQuestions = { question1: false, question2: false, question3: false, question4: false, question5: false };

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

    // Submit on click and check score
    submitBtn.addEventListener("click", function questionOneCheck() {
        if (document.getElementById("d").checked) {
            score++;
        } else if (!document.getElementById("d").checked) {
            wrongAnswer();
        }
        answeredQuestions["question1"] = true;
        // Call question two after finished checking question one and remove event listener.
        this.removeEventListener("click", questionOneCheck);
        submitBtn.remove();
        questionTwo();
    });
}


function questionTwo() {
    // same functionality as question one overall
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

    // Submit on click and check score
    submitBtn.addEventListener("click", function questionTwoCheck() {
        if (document.getElementById("a").checked) {
            score++;
        } else if (!document.getElementById("a").checked) {
            wrongAnswer();
        }
        answeredQuestions["question2"] = true;
        submitBtn.remove();
        // Call question three after finished checking question one
        questionThree();
        this.removeEventListener("click", questionTwoCheck);
    });
}

function questionThree() {
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

    submitBtn.addEventListener("click", function questionThreeCheck() {
        if (document.getElementById("q3Answer").value.toLowerCase() === "undefined") {
            score++;
        } else {
            wrongAnswer();
        }
        answeredQuestions["question3"] = true;
        submitBtn.remove();
        this.removeEventListener("click", questionThreeCheck);
        questionFour();
    })
}

function questionFour() {
    // Same as one and two
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

    submitBtn.addEventListener("click", function questionFourCheck() {
        if (document.getElementById("e").checked) {
            score++;
        } else if (!document.getElementById("e").checked) {
            wrongAnswer();
        }
        answeredQuestions["question4"] = true;
        submitBtn.remove();
        // Call question five after finished checking question one
        this.removeEventListener("click", questionFourCheck);
        questionFive();
    });
}

function questionFive() {
    h1.innerHTML = "Is HTML a programming language? True or False"
    questions.innerHTML = "";

    answers = ["true", "false"];

    generateRadio(answers);

    //id of submit5
    addButton();

    submitBtn.addEventListener("click", function questionFiveCheck() {
        if (document.getElementById("false").checked) {
            score++;
        } else if (!document.getElementById("false").checked) {
            wrongAnswer();
        }
        // End the quiz after question 5
        answeredQuestions["question5"] = true;
        endQuiz();
        this.removeEventListener("click", questionFiveCheck);
        submitBtn.remove();
    })
}

function start() {
    // Hide the start button and view highscores
    startBtn.style.display = "none";
    highScores.style.visibility = "hidden";
    // Start timer
    startTimer();
    // Call question one and change background for its text.
    questions.style.backgroundColor = "#666";
    questionOne();
}

function startTimer() {
    interval = setInterval(function () {
        timeRemaining--;
        timeCounter.innerHTML = timeRemaining;
        if (timeRemaining <= 0) {
            timesUp();
        }
    }, 1000);
}

function timesUp() {
    clearInterval(interval);

    let unfinished = 0;
    // Determine questions left unanswered and subtract from score. 
    for (let question in answeredQuestions) {
        if (answeredQuestions[question] === false) {
            wrongAnswer();
        }
    }

    endQuiz();
    submitBtn.remove();
}

function wrongAnswer() {
    score--;
    if (score <= 0) {
        score = 0;
    }
    timeRemaining -= 10;
    if (timeRemaining <= 0) {
        timeRemaining = 0;
    }
    timeCounter.innerHTML = timeRemaining;
}

function addButton() {
    newBtn.innerHTML = "Submit";
    newBtn.setAttribute("class", "btn my-5 text-light");
    newBtn.setAttribute("id", "submitBtn");
    container.appendChild(newBtn);
    submitBtn = document.getElementById("submitBtn");
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
    clearInterval(interval);
    h1.innerHTML = "All done!";
    // Change background of questions to same as page;
    questions.style.backgroundColor = "#555";
    questions.innerHTML = `<pre class="text-light text-left mb-3 pl-3">Your score is: ${score}</pre>`;
    // Create input for user name.
    document.getElementById("radioBtn").innerHTML = '<label for="submission">Enter your name:</label>' + " " +
        `<input type="text" id="submission">`;
    // create new button for submitting.
    let endBtn = document.createElement("button");
    endBtn.setAttribute("class", "btn my-5 text-light");
    endBtn.setAttribute("id", "endBtn");
    endBtn.innerHTML = "submit";
    container.appendChild(endBtn);

    document.getElementById("endBtn").addEventListener("click", function () {
        username = document.getElementById("submission").value;
        if (username === "") {
            username = "player";
        }
        showScores();
        document.getElementById("endBtn").remove();
    })
}

function showScores() {
    // Remove html elements no longer needed.
    highScores.removeEventListener("click", showScores);
    h1.remove();
    questions.remove();
    form.remove();
    startBtn.remove();

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
    // Dont update if they didnt play. (only way it's empty)
    if (username !== "") {
        scoreList[username] = score;
        // Store to local storage. If string is empty, means user didnt take quiz and is accessing highscores. Dont write.
        storeObj(scoreList);
    }

    // Sort object so it renders highscores in order.
    let sortedScoreList = sortObj(scoreList);

    let scores = document.createElement("ul");
    container.appendChild(scores);

    for (let person in sortedScoreList) {
        let scoreItem = document.createElement("li");
        scoreItem.innerHTML = person + ": " + sortedScoreList[person];
        scores.appendChild(scoreItem);
    }
}

function storeObj(obj) {
    localStorage.setItem("scores", JSON.stringify(obj));
}

function sortObj(obj) {
    let sorted = Object.entries(obj).sort((a, b) => b[1] - a[1]);
    let newObj = {};
    for (let i = 0; i < sorted.length; i++) {
        newObj[sorted[i][0]] = sorted[i][1];
    }
    return newObj;
}

startBtn.addEventListener("click", start);
highScores.addEventListener("click", showScores);
$(window).keydown(function (event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        return false;
    }
});