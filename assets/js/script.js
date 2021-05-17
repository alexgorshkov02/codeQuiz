var pageIDs = {
    startButton: "startButton",
    mainArea: "main_area",
    answersArea: "answers_area"
}

var questions = [
    {
        question: "Question1",
        t: "Answer1",
        f1: "dssfdsfdgfg1",
        f2: "dssfdsfdgfg2",
        f3: "dssfdsfdgfg3"
    },

    {
        question: "Question2",
        t: "Answer2",
        f1: "dssfdsfdgfg1",
        f2: "dssfdsfdgfg2",
        f3: "dssfdsfdgfg3"
    },

    {
        question: "Question3",
        t: "Answer3",
        f1: "dssfdsfdgfg1",
        f2: "dssfdsfdgfg2",
        f3: "dssfdsfdgfg3"
    }
]

var finalScore = 0;

// function getFinalScore() {
//     return finalScore;
// }

// function setFinalScore(finalScore) {
//     finalScore = finalScore;
// }

// function addPoints(points) {
//     var finalScore = getFinalScore();
//     finalScore = + points;
//     setFinalScore(finalScore);
// }

var questionCounter = 0;

// function getQuestionCounter() {
//     return questionCounter;
// }

// function setQuestionCounter(questionCounter) {
//     questionCounter = questionCounter;
// }


var timerValue = 10;

function modifyArea(area, questionNumber) {
    var modifiedArea = clearArea(area);

    if (area === pageIDs.mainArea) {
        console.log(questionNumber);
        console.log(questions);
        console.log(questions[questionNumber]);
        console.log(questions[questionNumber].question);
        modifiedArea.innerHTML = questions[questionNumber].question;
        modifiedArea.setAttribute("class", "question")
        modifiedArea.setAttribute("data-question", i);
    }

    if (area === pageIDs.answersArea) {
        var answers = [];
        answers = questions[questionNumber];
        // console.log(answers);
        delete answers.question;
        // console.log(answers);
        answers = Object.values(answers);
        // console.log(answers);

        for (var i = 0; i < answers.length; i++) {
            var div = document.createElement('div');
            var answer = modifiedArea.appendChild(div);
            answer.setAttribute("class", "answer")
            answer.setAttribute("id", i);
            answer.innerHTML = answers[i];

            // Listener for each answer
            answer.addEventListener("click", function (e) {
                selectedAnswer = e.target;
                // console.log("selectedAnswer: ", selectedAnswer);

                if (selectedAnswer !== null) {
                    var selectedAnswerText = selectedAnswer.textContent.toLowerCase();
                    console.log(selectedAnswerText);
                }
                // console.log("1problem");
                // console.log(selectedAnswerText);
                // console.log("2problem");
                // console.log(questions[questionNumber].t.toLowerCase());
                if (selectedAnswerText === questions[questionNumber].t.toLowerCase()) {
                    finalScore++;
                }
                //Check if we reached the last question
                if ((questions.length - 1) === questionNumber) {
                    finishQuiz();
                } else {
                    showNextQuestion();
                }
            })

        }
    }
    modifiedArea.style.textAlign = "center";
    modifiedArea.style.display = "flex";
    modifiedArea.style.flexDirection = "column";
}

function finishQuiz() {
    clearInterval(timer);        
    var timerTime = document.querySelector("#timer");
    timerTime.textContent = 0;

    clearArea(pageIDs.mainArea);
    clearArea(pageIDs.answersArea);

    alert("Your final score is: " + finalScore);
}

function clearArea(area) {
    // Select an area to change
    var modifiedArea = document.getElementById(area);
    modifiedArea.textContent = "";
    return modifiedArea;
}

function showQuestion(questionNumber) {
    modifyArea(pageIDs.mainArea, questionNumber);
}

function showAnswers(questionNumber) {
    modifyArea(pageIDs.answersArea, questionNumber);
}

function showNextQuestion() {
    // var questions = getQuestions();
    // var chosenQuestion = calculatenextQuestion(questions);
    // if (!questionCounter) {
    //     setQuestionCounter(0);
    // }

    // console.log(questionCounter);
    // var questionNumber = getQuestionCounter();
    showQuestion(questionCounter);
    showAnswers(questionCounter);
    // console.log(questionNumber++);
    // console.log(questionNumber+1);
    questionCounter++;
    // setQuestionCounter(questionNumber);

}

function delayTimer() {
    timeoutID = setTimeout(delayedFunction, 3000);
}

function delayedFunction() {
    alert("Three seconds have elapsed.");
}

var timer;

function repeatEverySecond() {
    timer = setInterval(timerDecrementer, 1000);
}

function timerDecrementer() {

    if (timerValue === 0) {
        finishQuiz();
        return;

    } else {
        console.log("One second elapsed.");
        var timerTime = document.querySelector("#timer");
        timerValue--;
        timerTime.textContent = timerValue;
        console.log(timerValue);
    }
}

function startQuiz() {
    console.log(questionCounter);
    showNextQuestion();

    repeatEverySecond();

}