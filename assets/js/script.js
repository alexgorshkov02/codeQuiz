var pageIDs = {
    startButton: "startButton",
    mainArea: "main_area",
    answersArea: "answers_area"
}

var questions = [
    { q: "Question1", t: "Answer1", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
    { q: "Question2", t: "Answer2", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
    { q: "Question3", t: "Answer3", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
    { q: "Question4", t: "Answer4", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
    { q: "Question5", t: "Answer5", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
    { q: "Question6", t: "Answer6", f1: "dssfdsfdgfg1", f2: "dssfdsfdgfg2", f3: "dssfdsfdgfg3" },
]


// function showQuestion()

function selectAnswer() {
    // Select the answers area
    var answersArea = document.getElementById(pageIDs.answersArea);
    answersArea.addEventListener("click", function (e) {
        console.log(e.target);
        startQuiz();
    })
}

function startQuiz() {
    // Select the question area
    var questionArea = document.getElementById(pageIDs.mainArea);
    questionArea.style.textAlign = "center";
    // Choose a random question
    var i = Math.floor(Math.random() * questions.length)
    questionArea.innerHTML = questions[i].q;

    // console.log(questions);

    // Select the answers area
    var answersArea = document.getElementById(pageIDs.answersArea);
    answersArea.style.textAlign = "center";
    answersArea.style.display = "flex";
    answersArea.style.flexDirection = "column";

    // Indexed object: a question and all answers
    chosenQuestion = questions[i];
    // Remove the question
    delete chosenQuestion.q;

    // Convert answersArray object to an array of values
    var choices = Object.values(chosenQuestion);

    console.log(choices);

    // Show all answers for an user
    for (var j = 0; j < choices.length; j++) {
        var div = document.createElement('div');
        var answer = answersArea.appendChild(div);
        answer.innerHTML = choices[j];
    }
    // Remove the shown object (the question and answers)
    questions.splice(i, 1);

    selectAnswer();
};


// console.log(document)

// document.getElementById("startButton").addEventListener("click", function(e) {
//     console.log(e.target);
// });

// document.getElementById("startButton").addEventListener('click', console.log(getInput()))


// document.getElementById(mainArea).textContent = "dsfsdfds"