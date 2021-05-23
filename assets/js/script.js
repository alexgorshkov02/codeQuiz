var pageIDs = {
    topSection: "top_section",
    startButton: "startButton",
    topResults: "topScores",
    mainArea: "main_area",
    answersArea: "answers_area",
    additionalButtonsArea: "additional_buttons",
    viewHighScores: "viewHighScores",
    timer: "timer"
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

var punishTime = 5;
var amountTopResults = 3;

var finalScore = 0;
var questionCounter = 0;
var timerValue = 120;

function resetValues() {
    finalScore = 0;
    questionCounter = 0;
    timerValue = 120;
}

function modifyArea(area, questionNumber) {
    var modifiedArea = clearArea(area);
    console.log("Area:" + area);
    console.log("questionNumberBegin:" + questionNumber);

    if (area === pageIDs.mainArea) {
        console.log(questionNumber);
        console.log(questions);
        console.log(questions[questionNumber]);
        // console.log(questions[questionNumber].question);
        var questionValue = document.createElement('div');
        questionValue.innerHTML = questions[questionNumber].question;
        questionValue.setAttribute('class', 'question')
        modifiedArea.appendChild(questionValue);
    }

    if (area === pageIDs.answersArea) {
        var answers = [];
        var answersWithQuestion = questions[questionNumber];
        answers.push(answersWithQuestion.t)
        answers.push(answersWithQuestion.f1)
        answers.push(answersWithQuestion.f2)
        answers.push(answersWithQuestion.f3)

        console.log(questions);
        console.log(answers);
        delete answers.question;
        console.log(questions);
        console.log(answers);
        answers = Object.values(answers);
        // console.log(answers);

        for (var i = 0; i < answers.length; i++) {
            var div = document.createElement('div');
            var answer = modifiedArea.appendChild(div);
            answer.setAttribute("class", "answer")
            answer.setAttribute("id", i);
            answer.innerHTML = answers[i];
            answer.style.width = "max-content";
        }
    }
    modifiedArea.style.textAlign = "center";
    modifiedArea.style.display = "flex";
    modifiedArea.style.flexDirection = "column";
    modifiedArea.style.alignItems = "center";
}

function finishQuiz() {
    clearInterval(timer);
    var timerTime = document.querySelector("#timer");
    timerTime.textContent = 0;

    clearArea(pageIDs.mainArea);
    clearArea(pageIDs.answersArea);

    // document.getElementById(pageIDs.answersArea).removeEventListener('click', function (e){})

    saveResults();
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
    console.log("questionCounter_Before1: " + questionCounter);
    showQuestion(questionCounter);
    showAnswers(questionCounter);
    console.log("questionCounter_Before2: " + questionCounter);
    console.log("questionCounter_After: " + questionCounter);
}

var timer;

function repeatEverySecond() {
    timer = setInterval(timerDecrementer, 1000);
}

function timerDecrementer() {

    if (timerValue <= 0) {
        finishQuiz();
        return;

    } else {
        // console.log("One second elapsed.");
        var timerTime = document.querySelector("#timer");
        timerValue--;
        timerTime.textContent = timerValue;
        // console.log(timerValue);
    }
}

function timeSubtractor() {
    var timerTime = document.querySelector("#timer");
    timerValue -= punishTime;
    timerTime.textContent = timerValue;
    // console.log(timerValue);
}

function saveResults() {
    clearArea(pageIDs.additionalButtonsArea)
    var finalScoreText = clearArea(pageIDs.mainArea);
    finalScoreText.innerHTML = "Your final score is: " + finalScore;

    var answersArea = document.getElementById(pageIDs.answersArea);
    console.log(answersArea);
    var div = document.createElement('div');
    answersArea.appendChild(div);
    answersArea.innerHTML = '<input placeholder="Input your initials" id="name"/>'

    answersArea.style.display = "flex";
    answersArea.style.flexDirection = "column";
    answersArea.style.width = "max-content";
    answersArea.style.margin = "auto";


    var additionalButtonsArea = document.getElementById(pageIDs.additionalButtonsArea);
    var buttonSaveResultContainer = document.createElement('div');
    var buttonSaveResult = document.createElement("button");
    buttonSaveResult.innerHTML = "Save the result";

    buttonSaveResult.style.display = "flex";
    buttonSaveResult.style.flexDirection = "column";
    buttonSaveResult.style.width = "max-content";
    buttonSaveResult.style.margin = "auto";

    additionalButtonsArea.appendChild(buttonSaveResultContainer.appendChild(buttonSaveResult));

    buttonSaveResult.addEventListener('click', function () {
        var nameValue = document.getElementById("name").value

        if (nameValue.length === 0) {
            alert("Please input your initials");
        } else if (nameValue.length > 2) {
            alert("The initials can't be nore than 2 letters");
        } else {
            // console.log("value123", value);
            playerItem = { name: nameValue, result: finalScore };
            // Get an exist array of the results or empty
            var players = getTopResults(amountTopResults);
            // console.log("playerItem123", playerItem);
            players.push(playerItem);
            localStorage.setItem("players", JSON.stringify(players));
            buttonSaveResult.innerHTML = "";

            showResults();
        }
    });
}

function getTopResults(amountResults) {
    var players = JSON.parse(localStorage.getItem("players") || "[]");
    console.log(players);

    //Sorting for the score
    var sortedPlayers = players.sort(function (a, b) {
        return b.result - a.result;
    });

    if (players.length < amountResults) {
        amountResults = players.length
    }
    var sortedSelectedPlayers = [];

    for (var i = 0; i < amountResults; i++) {
        sortedSelectedPlayers.push(sortedPlayers[i]);
    }

    return sortedSelectedPlayers;
}

function clearAllSection() {
    clearArea(pageIDs.topSection);
    clearArea(pageIDs.topResults);
    clearArea(pageIDs.mainArea);
    clearArea(pageIDs.answersArea);
    clearArea(pageIDs.additionalButtonsArea);
}

function showResults() {
    clearAllSection();
    var mainArea = clearArea(pageIDs.mainArea);
    // console.log(mainArea);

    var players = getTopResults(amountTopResults);

    if (players.length === 0) {
        mainArea.innerHTML = "No results found"
    } else {

        for (var i = 0; i < players.length; i++) {
            var newResultLine = document.createElement('div');

            var newResultLineName = document.createElement('span');
            newResultLineName.innerHTML = i+1 + ") " + players[i].name;
            newResultLineName.style.paddingRight = "20px"

            newResultLine.append(newResultLineName);

            var newResultLineResult = document.createElement('span');
            newResultLineResult.innerHTML = players[i].result;

            newResultLine.append(newResultLineResult);
            newResultLine.style.display = "flex";
            newResultLine.style.flexDirection = "row";
            newResultLine.style.justifyContent = "space-between";

            mainArea.appendChild(newResultLine);
        }
    }
    mainArea.style.display = "flex";
    mainArea.style.flexDirection = "column";
    mainArea.style.width = "max-content";
    mainArea.style.margin = "auto";
    mainArea.style.alignItems = "normal";
    mainArea.style.textAlign = 'initial';

    var topResults = clearArea(pageIDs.topResults);
    topResults.innerHTML = '<h1>TOP-' + amountTopResults + ' Results:</h1>';
    topResults.style.display = "flex";
    topResults.style.flexDirection = "column";
    topResults.style.alignContent = "space-between";
    topResults.style.width = "max-content";
    topResults.style.margin = "auto";


    var additionalButtonsAreaSection = document.getElementById(pageIDs.additionalButtonsArea);
    var buttonMenuContainer = document.createElement('div');
    var buttonMenu = document.createElement('button');
    buttonMenu.innerHTML = "Main Menu";
    buttonMenuContainer.append(buttonMenu);
    additionalButtonsAreaSection.appendChild(buttonMenuContainer);

    var buttonClearHighScoresContainer = document.createElement('div');
    var buttonClearHighScores = document.createElement('button');
    buttonClearHighScores.innerHTML = "Clear High Scores";
    buttonClearHighScoresContainer.append(buttonClearHighScores);
    additionalButtonsAreaSection.append(buttonClearHighScoresContainer);
    additionalButtonsAreaSection.style.display = "flex";
    additionalButtonsAreaSection.style.justifyContent = "flex-start";

    buttonMenu.addEventListener('click', function () {
        mainPage();
    })

    buttonClearHighScores.addEventListener('click', function () {
        var players = [];
        localStorage.setItem("players", JSON.stringify(players));
        showResults();
    })
}

function mainPage() {
    clearAllSection();

    // Top Section BEGIN
    var topSection = document.getElementById(pageIDs.topSection);
    // console.log(topSection);
    var viewHighScoresContainer = document.createElement('div');
    var viewHighScores = document.createElement('h3');
    viewHighScores.setAttribute("id", pageIDs.viewHighScores);
    viewHighScores.innerHTML = "View high scores";
    viewHighScoresContainer.appendChild(viewHighScores)
    topSection.appendChild(viewHighScoresContainer);

    var viewHighTimerContainer = document.createElement('div');
    var viewHighTimer = document.createElement('h3');
    viewHighTimer.innerHTML = "Time: ";

    viewHighTimerContainer.appendChild(viewHighTimer);

    var viewHighTimerValue = document.createElement('h3');
    viewHighTimerValue.setAttribute("id", pageIDs.timer);
    viewHighTimerValue.innerHTML = "0";

    viewHighTimerContainer.append(viewHighTimerValue);
    topSection.appendChild(viewHighTimerContainer);

    document.getElementById(pageIDs.viewHighScores).addEventListener('click', function () {
        showResults();
    })
    // Top Section END

    // Main Section START
    var mainSection = document.getElementById(pageIDs.mainArea);
    var mainTextContainer = document.createElement('div');
    var mainTextH1 = document.createElement('h1');
    mainTextH1.innerHTML = "Coding Quiz Challenge";
    mainTextContainer.appendChild(mainTextH1);
    mainSection.appendChild(mainTextContainer);
    var mainTextH3Line1 = document.createElement('h3');
    mainTextH3Line1.innerHTML = "Try to answer the following code-related questions within the time limit.";
    mainTextContainer.appendChild(mainTextH3Line1);
    mainSection.appendChild(mainTextContainer);
    var mainTextH3Line2 = document.createElement('h3');
    mainTextH3Line2.innerHTML = "Keep in mind that incorrect answers will penalize your score/time";
    mainTextContainer.appendChild(mainTextH3Line2);
    mainSection.appendChild(mainTextContainer);
    var mainTextH3Line3 = document.createElement('h3');
    mainTextH3Line3.innerHTML = "by ten seconds!";
    mainTextContainer.appendChild(mainTextH3Line3);
    mainSection.appendChild(mainTextContainer);
    // Main Section END

    // Answer or additonal Section START
    var additionalSection = document.getElementById(pageIDs.answersArea);
    var buttonStarQuizContainer = document.createElement('div');
    var buttonStarQuiz = document.createElement('button');
    buttonStarQuiz.innerHTML = "Start Quiz";
    buttonStarQuizContainer.append(buttonStarQuiz);
    additionalSection.appendChild(buttonStarQuizContainer);

    buttonStarQuiz.addEventListener('click', function () {
        startQuiz();
    })
    // Answer or additonal Section END
}

function startQuiz() {
    resetValues();
    // console.log(questionCounter);
    // clearArea(pageIDs.additionalButtonsArea);
    clearArea(pageIDs.answersArea);
    showNextQuestion();
    repeatEverySecond();

    // Listener for answer area
    document.getElementById(pageIDs.answersArea).addEventListener('click', function (e) {
        // e.stopPropagation();
        e.stopImmediatePropagation();
        if (e.target.classList.contains("answer")) {
            selectedAnswer = e.target;
            // console.log("selectedAnswer: ", selectedAnswer);
            console.log("test123:" + questionCounter);
            if (selectedAnswer !== null) {
                var selectedAnswerText = selectedAnswer.textContent.toLowerCase();
                // console.log(selectedAnswerText);
            }

            if (selectedAnswerText === questions[questionCounter].t.toLowerCase()) {
                finalScore++;
            } else {
                timeSubtractor();
            }
            // console.log("questionNumber_inEvent: " + questionCounter);

            //Check if we reached the last question in the array
            if (questions.length - 1 === questionCounter) {
                finishQuiz();
            } else {
                questionCounter++;
                showNextQuestion();
            }
        }
    })
}