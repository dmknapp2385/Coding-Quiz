var question = document.querySelector("h1[name='question'");
var buttons = document.querySelector(".button-box");
var button = document.querySelector('.btn');
var timer = document.querySelector(".timer span");
console.log(timer);
var countdown = 75;

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


// fucntion to handle any click on quiz buttons
var buttonHandler = function (event) {
    var clickedButton = event.target
    if (clickedButton.matches(".start-bt")) {
        var introP = document.querySelector(".heading p");
        introP.remove();
        startClock();
        questionGenerator();
        answerButtons(); 
        }
    else if (clickedButton.matches(".answer-bt")) {

    }
}
    
// start function that will turn p in section invisible 

// question function to pring question

//button function to generate and style answer buttons

//endQuiz funcitonto pop up high score and initial data storage
buttons.addEventListener("click", buttonHandler);