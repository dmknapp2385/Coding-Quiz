var questionHolder = document.querySelector("h1[name='question'");
var buttonsDiv = document.querySelector(".button-box");
var timer = document.querySelector(".timer span");
var countdown = 700;
var questionNumber = 0;
var score = 0;

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
        type: "trueFalse", 
        answers:[
            {
                answer:"True",
                isCorrect: false
            },
            {
                answer:"False",
                isCorrect: true
            }
        ]
    },
    {
        question: "What is not a transform property in CSS?", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "Rotate", 
                isCorrect: false
            }, 
            {
                answer: "Translate", 
                isCorrect: false
            },
            {
                answer: "Scale", 
                isCorrect: false
            },
            {
                answer: "Skew", 
                isCorrect: false
            },
            {
                answer: "Transition", 
                isCorrect: true
            }

        ]
    },
    {
        question: "What symbol is used to designate an array in JavaScript?", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "{}", 
                isCorrect: false
            }, 
            {
                answer: "()", 
                isCorrect: false
            },
            {
                answer: ":", 
                isCorrect: false
            },
            {
                answer: "[]", 
                isCorrect: true
            },
        ]
    },
    {
        question: "What is an example of an HTML tag", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "<p>", 
                isCorrect: true
            }, 
            {
                answer: "<h1>This is a Heading</h1>", 
                isCorrect: false
            },
            {
                answer: ".class", 
                isCorrect: false
            },
            {
                answer: "#id", 
                isCorrect: false
            },
        ]
    },
    {
        question: "What is not an HTML attribute?", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "src", 
                isCorrect: false
            }, 
            {
                answer: "href", 
                isCorrect: false
            },
            {
                answer: "style", 
                isCorrect: false
            },
            {
                answer: "class", 
                isCorrect: false
            },
            {
                answer: "h1", 
                isCorrect: true
            }
        ]
    },
    {
        question: "'var myFun = function ()' is an example of a function expression.", 
        type: "trueFalse", 
        answers: [
            {
                answer: "True", 
                isCorrect: true
            }, 
            {
                answer: "False", 
                isCorrect: false
            }
        ]
    },
    {
        question: "What symbols designate a comment in JavaScript", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "//", 
                isCorrect: true
            }, 
            {
                answer: "/*", 
                isCorrect: false
            },
            {
                answer: "<-- -->", 
                isCorrect: false
            },
            {
                answer: "||", 
                isCorrect: false
            },
        ]
    },
    {
        question: "True or False are called boolean values.", 
        type: "trueFalse", 
        answers: [
            {
                answer: "True", 
                isCorrect: true
            }, 
            {
                answer: "False", 
                isCorrect: false
            },
        ]
    },
    {
        question: "What is the name for a function that is specific to a certain object?", 
        type: "Multiple Choice", 
        answers: [
            {
                answer: "Method", 
                isCorrect: true
            }, 
            {
                answer: "Property", 
                isCorrect: false
            },
            {
                answer: "Variable", 
                isCorrect: false
            },
            {
                answer: "Object Function", 
                isCorrect: false
            },
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

var questionGenerator = function (questionNumber) {
    //make sure question holder and buttons cleared
    questionHolder.textContent = "";
    buttonsDiv.innerHTML = "";
    if (questionNumber < questionArry.length) {
        console.log(questionArry.length);
        console.log(questionNumber);
         //insert question into browser
        var questionSelected = questionArry[questionNumber]
        questionHolder.textContent = questionSelected.question;
        //generate answer buttons
        var answerArry = questionSelected.answers;
        var newAnswerArry = [];
        //randomize answer order
        while (answerArry.length > 0) {
            var randomAnswerOrder = Math.floor(Math.random() * answerArry.length);
            newAnswerArry.push(answerArry[randomAnswerOrder]);
            answerArry.splice(randomAnswerOrder, 1);
        }
        createButtons(newAnswerArry);
    }
    else {
        endQuiz();
    }
}

// create buttons for answers

var createButtons = function (arrayobj) {
    for (var i = 0; i < arrayobj.length; i++) {
        var answer = arrayobj[i].answer
        var isCorrect = arrayobj[i].isCorrect
        var buttonEl = document.createElement("button");
        buttonEl.className = "btn answer-bt";
        buttonEl.setAttribute("data-is-correct", isCorrect);
        buttonEl.textContent = (i + 1) + ": " + answer;
        buttonsDiv.appendChild(buttonEl);
    }
}


// fucntion to handle any click on quiz buttons
var buttonHandler = function (event) {
    var clickedButton = event.target
    var correct = document.querySelector(".correct");
    var wrong = document.querySelector(".wrong");
    // make sure cleared before next button
    correct.textContent = "";
    wrong.textContent = "";
    //start button
    if (clickedButton.matches(".start-bt")) {
        var introP = document.querySelector(".heading p");
        introP.remove();
        var startButton = document.querySelector(".start-bt");
        startButton.remove();
        startClock();
        questionGenerator(questionNumber); 
        }
    //answer buttons
    else if (clickedButton.matches(".answer-bt")) {

        if (clickedButton.dataset.isCorrect === 'true') {
            correct.textContent = "Correct!";
            questionNumber++;
            score++;
            questionGenerator(questionNumber);
        }

        else {
            wrong.textContent = "Wrong!";
            penalize();
        }

    }
}

// end quiz function to store high score
 var endQuiz = function () {
     countdown = 0;
     var footer = document.querySelector("footer");
     footer.innerHTML = "";

 }
    

//endQuiz funcitonto pop up high score and initial data storage
buttonsDiv.addEventListener("click", buttonHandler);