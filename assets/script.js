var questionHolder = document.querySelector("h1[name='question'");
var buttonsDiv = document.querySelector(".button-box");
var timer = document.querySelector(".timer span");
var countdown = 40;
var questionNumber = 0;
var score = 0;
var highScore = document.querySelector(".high-scores");
var scoresArray = [];

loadScores();

//function that retrieves localstorage and saves in scores Array
function loadScores () {
    var retrievedScores = localStorage.getItem("Scores");
     retrievedScores = JSON.parse(retrievedScores);

    if (!retrievedScores) {
        return false;
    }
    else {
        for (var i = 0; i <retrievedScores.length; i++){
            scoresArray.push(retrievedScores[i]);
        }
    }
}



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
        if (countdown > 0 ) {
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
    if (countdown > 10) {
        countdown -= 10;
    }
    else{
        endQuiz();
    }
}

// for loop to iterate through quiz questions

var questionGenerator = function (questionNumber) {
    //make sure question holder and buttons cleared
    questionHolder.textContent = "";
    buttonsDiv.innerHTML = "";
    if (questionNumber < questionArry.length) {
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
// end quiz function to display score and ask initials input
 var endQuiz = function () {
     timer.remove();
     buttonsDiv.innerHTML= "";
     var footer = document.querySelector("footer");
     footer.innerHTML = "";
     questionHolder.innerHTML = "The quiz has ended. <br> You got a score of " + score + " . <br> Please enter your initials to save your score."
     var scorediv = document.querySelector(".score");
     scorediv.style.display = "block";
     scorediv.addEventListener("click", saveScore);
 }

 // save function to save score and initals to scores array and local stoarge
 var saveScore = function (event) {
     var saveScoreButton = event.target
     if (saveScoreButton.matches(".save-score")) {
        var initiaslInput = document.querySelector("input[name='initials']").value;
        var scoreObject = {initials: initiaslInput, score:score}
        scoresArray.push(scoreObject);
        alert("Your score has been saved!")
        localStorage.setItem("Scores", JSON.stringify(scoresArray));
     }
 }
 
 // High score button to show highscore
var highScoreList = function (event) {
    var highScoreButton = event.target;
    if (!scoresArray) {
        alert("No scores saved.");
    }
    else {
        questionHolder.textContent = "High Scores";
        var introP = document.querySelector(".heading p");
        introP.remove();
        buttonsDiv.innerHTML = " ";
        buttonsDiv.className = "score-list";
        var highScoreHeader = document.createElement("p");
        highScoreHeader.innerHTML = "Initials";
        var highscoreHeadertwo = document.createElement("p");
        highscoreHeadertwo.innerHTML = "Scores"
        buttonsDiv.appendChild(highScoreHeader);
        buttonsDiv.appendChild(highscoreHeadertwo);
        for (var i = 0; i < scoresArray.length; i++) {
            var initials = scoresArray[i].initials;
            var savedScore = scoresArray[i].score;
            var scoreInitalsP = document.createElement("p");
            scoreInitalsP.textContent = initials
            var scoreP = document.createElement('p');
            scoreP.textContent = savedScore;
            buttonsDiv.appendChild(scoreInitalsP);
            buttonsDiv.appendChild(scoreP);
        }
        //  scorebuttons dive to append to buttonsDiv
        var scoreButtonsDiv = document.createElement('div');
        scoreButtonsDiv.className="score-buttons"
        var backButton = document.createElement("button");
        backButton.className = 'btn back-btn';
        var backButtonLink = document.createElement ("a");
        backButtonLink.href = "index.html";
        backButton.appendChild(backButtonLink);
        backButton.textContent = "Back"
        scoreButtonsDiv.appendChild(backButton);
        var clearButton = document.createElement('button');
        clearButton.className = 'btn clear-btn'
        clearButton.textContent = "Clear Scores";
        scoreButtonsDiv.appendChild(clearButton);
        buttonsDiv.appendChild(scoreButtonsDiv);
    }
}

buttonsDiv.addEventListener("click", buttonHandler);
highScore.addEventListener("click", highScoreList);
