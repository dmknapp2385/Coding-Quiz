var question = document.querySelector("h1[name='question'");
var buttons = document.querySelector(".button-box");
var button = document.querySelector('.btn');
var timer = document.querySelector(".timer span");
console.log(timer);
var countdown = 75;

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

startClock();


//
//timer funtion for top that will delete 10 s for 
// start function that will turn p in section invisible 

// question function to pring question

//button function to generate and style answer buttons

//endQuiz funcitonto pop up high score and initial data storage
