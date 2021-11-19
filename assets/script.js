var questionHolder = document.querySelector("h1[name='question'");
var buttonsDiv = document.querySelector(".button-box");
var timer = document.querySelector(".timer span");
var countdown = 75;

// array of questions and answers
var questionArry = [
    {
        question: "What is the HTML element for the largest heading?",
        type: "Multiple Choice",
        answers: [
            {
                answer: "h1", 
                isCorrect: true
            },
            {
                answer: "div",
                isCorrect: false
            }, 
            {
                answer: "h3",
                isCorrect: false
            }, 
            {
                answer: "header",
                isCorrect: false
            }, 
            
        ]
    }, 
    {
        question: "Git merge is the same thing as git pull.",
        type: "trueFalse"
    },
    {
        question: "What is not a transform property in CSS?", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "Rotate", 
                value: false
            }, 
            {
                answer: "Translate", 
                value: false
            },
            {
                answer: "Scale", 
                value: false
            },
            {
                answer: "Skew", 
                value: false
            },
            {
                answer: "Transition", 
                value: true
            }

        ]
    }
]

// timer function to start countdown after start quiz button pushed
function startClock () {
    var startClock = setInterval(function(){
        if (countdown >0 ) {
        timer.textContent = countdown; 
        countdown--;
        }
        else {
            endQuiz();
        }
    }, 1000);       
}

// function to remove 10 seconds from timer for incorrect answers
var penalize = function () {
    countdown -= 10;
}

// for loop to iterate through quiz questions

var questionGenerator = function (arrayNumber) {
    if (questionArry[arrayNumber].type === "Multiple Choice") {
        multipleChoice(questionArry[arrayNumber]);
    }
    else if (questionArry[arrayNumber].type === "trueFalse") {
        //true false question generator
    }
}

// multiple choice function
var multipleChoice = function (questionobj) {
    var question = questionobj;
    //Insert question into browswer
    questionHolder.textContent = question.question;
    var answerArry = question.answers;
    var newAnswerArry = [];
    // randomize order of answers
    while (answerArry.length > 0) {
        var randomAnswerOrder = Math.floor(Math.random() * answerArry.length);
        newAnswerArry.push(answerArry[randomAnswerOrder]);
        answerArry.splice(randomAnswerOrder, 1);
    }
    console.log("newAnswerArry", JSON.stringify(newAnswerArry));
    createButtons(newAnswerArry);
}

// create buttons for answers

var createButtons = function (arrayobj) {
    for (var i = 0; i < arrayobj.length; i++) {
        var buttonEl = document.createElement("button");
        buttonEl.className = "btn answer-bt";
        buttonEl.setAttribute("data-is-correct", arrayobj.isCorrect);
        buttonEl.textContent = (i + 1) + ": " + arrayobj.answer;
        buttonsDiv.appendChild(buttonEl);
    }
}


// fucntion to handle any click on quiz buttons
var buttonHandler = function (event) {
    var clickedButton = event.target
    if (clickedButton.matches(".start-bt")) {
        var introP = document.querySelector(".heading p");
        introP.remove();
        var startButton = document.querySelector(".start-bt");
        startButton.remove();
        startClock();
        questionGenerator(0); 
        }
    else if (clickedButton.matches(".answer-bt")) {

    }
}
    


//button function to generate and style answer buttons

//endQuiz funcitonto pop up high score and initial data storage
buttonsDiv.addEventListener("click", buttonHandler);