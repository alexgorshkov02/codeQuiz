var pageIDs = {
  topSection: "top_section",
  startButton: "startButton",
  topResults: "topScores",
  mainArea: "main_area",
  answersArea: "answers_area",
  correctOrWrongArea: "correct_or_wrong_area",
  additionalButtonsArea: "additional_buttons",
  viewHighScores: "viewHighScores",
  timer: "timer",
};

var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    t: "&lt;script&gt;",
    f1: "&lt;javascript&gt;",
    f2: "&lt;scripting&gt;",
    f3: "&lt;js&gt;",
  },

  {
    question: "Where is the correct place to insert a JavaScript?",
    t: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct",
    f1: "The &lt;head&gt; section",
    f2: "The &lt;body&gt; section",
    f3: "In css stylesheet",
  },

  {
    question:
      'What is the correct syntax for referring to an external script called "xxx.js"?',
    f1: 'script name="xxx.js"',
    f2: 'script href="xxx.js"',
    t: 'script src="xxx.js"',
    f3: 'script ="xxx.js"',
  },

  {
    question: 'How do you write "Hello World" in an alert box?',
    t: 'alert("Hello World");',
    f1: 'alertBox("Hello World");',
    f2: 'msgBox("Hello World");',
    f3: 'msg("Hello World");',
  },

  {
    question: "How do you create a function in JavaScript?",
    t: "function myFunction()",
    f1: "function = myFunction()",
    f2: "function:myFunction()",
    f3: "function => myFunction()",
  },

  {
    question: 'How do you call a function named "myFunction"?',
    f1: "call myFunction()",
    t: "myFunction()",
    f2: "call function myFunction()",
    f3: "myFunction",
  },

  {
    question: "How to write an IF statement in JavaScript?",
    f1: "if i = 5",
    t: "if (i == 5)",
    f2: "if i == 5 then",
    f3: "if i = 5 then",
  },

  {
    question:
      'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    f1: "if i =! 5 then",
    f2: "if (i <> 5)",
    t: "if (i != 5)",
    f3: "if i <> 5",
  },
];

var punishTime = 10;
var amountTopResults = 3;

var finalScore = 0;
var questionCounter = 0;
var timerValue = 120;

function resetValues() {
  finalScore = 0;
  questionCounter = 0;
  timerValue = 120;
}

function randomazerArray(array) {
  randomazedArray = [];
  while (randomazedArray.length < array.length) {
    randomElement = array[Math.floor(Math.random() * array.length)];
    if (!randomazedArray.includes(randomElement)) {
      randomazedArray.push(randomElement);
    }
  }
  return randomazedArray;
}

function modifyArea(area, questionNumber) {
  var modifiedArea = clearArea(area);

  if (area === pageIDs.mainArea) {
    var questionValue = document.createElement("div");
    questionValue.innerHTML = questions[questionNumber].question;
    questionValue.setAttribute("class", "question");
    modifiedArea.appendChild(questionValue);
    modifiedArea.style.width = "auto";
  }

  if (area === pageIDs.answersArea) {
    var answers = [];
    var answersWithQuestion = questions[questionNumber];
    answers.push(answersWithQuestion.t);
    answers.push(answersWithQuestion.f1);
    answers.push(answersWithQuestion.f2);
    answers.push(answersWithQuestion.f3);

    answers = Object.values(answers);
    answers = randomazerArray(answers);

    for (var i = 0; i < answers.length; i++) {
      var divElement = document.createElement("div");
      var spanElement = document.createElement("span");
      spanElement.setAttribute("class", "answer");
      spanElement.setAttribute("id", i);
      spanElement.innerHTML = answers[i];
      spanElement.style.width = "max-content";
      spanElement.style.margin = "unset";
      divElement.append(spanElement);
      modifiedArea.append(divElement);
    }
  }
  modifiedArea.style.display = "flex";
  modifiedArea.style.flexDirection = "column";
  modifiedArea.style.alignItems = "flex-start";
  modifiedArea.style.margin = "unset";
}

function finishQuiz() {
  clearInterval(timer);
  var timerTime = document.querySelector("#timer");
  timerTime.textContent = 0;

  clearArea(pageIDs.mainArea);
  clearArea(pageIDs.answersArea);

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
  showQuestion(questionCounter);
  showAnswers(questionCounter);
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
    var timerTime = document.querySelector("#timer");
    timerValue--;
    timerTime.textContent = timerValue;
  }
}

function timeSubtractor() {
  var timerTime = document.querySelector("#timer");
  timerValue -= punishTime;
  timerTime.textContent = timerValue;
}

function saveResults() {
  clearArea(pageIDs.additionalButtonsArea);
  var finalScoreText = clearArea(pageIDs.mainArea);
  finalScoreText.innerHTML = "Your final score is: " + finalScore;
  finalScoreText.style.alignItems = "center";
  finalScoreText.style.margin = "auto";

  var answersArea = document.getElementById(pageIDs.answersArea);
  var div = document.createElement("div");
  answersArea.appendChild(div);
  answersArea.innerHTML =
    '<input placeholder="Input your initials" id="name"/>';

  answersArea.style.display = "flex";
  answersArea.style.flexDirection = "column";
  answersArea.style.width = "max-content";
  answersArea.style.margin = "auto";
  answersArea.style.alignItems = "center";

  var additionalButtonsArea = document.getElementById(
    pageIDs.additionalButtonsArea
  );
  var buttonSaveResultContainer = document.createElement("div");
  var buttonSaveResult = document.createElement("button");
  buttonSaveResult.innerHTML = "Save the result";

  buttonSaveResult.style.display = "flex";
  buttonSaveResult.style.flexDirection = "column";
  buttonSaveResult.style.width = "max-content";
  buttonSaveResult.style.margin = "auto";

  additionalButtonsArea.appendChild(
    buttonSaveResultContainer.appendChild(buttonSaveResult)
  );

  buttonSaveResult.addEventListener("click", function () {
    var nameValue = document.getElementById("name").value;

    if (nameValue.length === 0) {
      alert("Please input your initials");
    } else if (nameValue.length > 2) {
      alert("The initials can't be nore than 2 letters");
    } else {
      playerItem = { name: nameValue, result: finalScore };

      // Get an exist array of the results or empty
      var players = getTopResults(amountTopResults);
      players.push(playerItem);
      localStorage.setItem("players", JSON.stringify(players));
      buttonSaveResult.innerHTML = "";

      showResults();
    }
  });
}

function getTopResults(amountResults) {
  var players = JSON.parse(localStorage.getItem("players") || "[]");

  //Sorting for the score
  var sortedPlayers = players.sort(function (a, b) {
    return b.result - a.result;
  });

  if (players.length < amountResults) {
    amountResults = players.length;
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
  clearInterval(timer);
  clearAllSection();
  var mainArea = clearArea(pageIDs.mainArea);

  var players = getTopResults(amountTopResults);

  if (players.length === 0) {
    mainArea.innerHTML = "No results found";
  } else {
    for (var i = 0; i < players.length; i++) {
      var newResultLine = document.createElement("div");

      var newResultLineName = document.createElement("span");
      newResultLineName.innerHTML = i + 1 + ") " + players[i].name;
      newResultLineName.style.paddingRight = "20px";

      newResultLine.append(newResultLineName);

      var newResultLineResult = document.createElement("span");
      newResultLineResult.innerHTML = players[i].result;

      newResultLine.append(newResultLineResult);
      newResultLine.style.display = "flex";
      newResultLine.style.flexDirection = "row";
      newResultLine.style.justifyContent = "space-between";
      newResultLine.style.paddingLeft = "0px";
      newResultLine.style.marginBottom = "0px";

      mainArea.appendChild(newResultLine);
    }
  }
  mainArea.style.display = "flex";
  mainArea.style.flexDirection = "column";
  mainArea.style.width = "max-content";
  mainArea.style.margin = "auto";
  mainArea.style.alignItems = "normal";

  var topResults = clearArea(pageIDs.topResults);
  topResults.innerHTML = "<h1>TOP-" + amountTopResults + " Results:</h1>";
  topResults.style.display = "flex";
  topResults.style.flexDirection = "column";
  topResults.style.alignContent = "space-between";
  topResults.style.width = "max-content";
  topResults.style.margin = "auto";

  var additionalButtonsAreaSection = document.getElementById(
    pageIDs.additionalButtonsArea
  );
  var buttonMenuContainer = document.createElement("div");
  buttonMenuContainer.style.paddingLeft = "0px";
  buttonMenuContainer.style.marginBottom = "0px";
  var buttonMenu = document.createElement("button");
  buttonMenu.innerHTML = "Main Menu";
  buttonMenuContainer.append(buttonMenu);
  additionalButtonsAreaSection.appendChild(buttonMenuContainer);

  var buttonClearHighScoresContainer = document.createElement("div");
  buttonClearHighScoresContainer.style.paddingLeft = "10px";
  buttonClearHighScoresContainer.style.marginBottom = "0px";
  var buttonClearHighScores = document.createElement("button");
  buttonClearHighScores.innerHTML = "Clear High Scores";
  buttonClearHighScoresContainer.append(buttonClearHighScores);
  additionalButtonsAreaSection.append(buttonClearHighScoresContainer);
  additionalButtonsAreaSection.style.display = "flex";
  additionalButtonsAreaSection.style.justifyContent = "center";
  additionalButtonsAreaSection.style.paddingTop = "10px";

  buttonMenu.addEventListener("click", function () {
    mainPage();
  });

  buttonClearHighScores.addEventListener("click", function () {
    var players = [];
    localStorage.setItem("players", JSON.stringify(players));
    showResults();
  });
}

//Check if we reached the last question in the array
function lastQuestionChecker() {
  if (questions.length - 1 === questionCounter) {
    clearArea(pageIDs.correctOrWrongArea);
    finishQuiz();
  } else {
    questionCounter++;
    showNextQuestion();
  }
}

var timeoutID;

function delayTimerCorrectAnswer() {
  var additionalSection = document.getElementById(pageIDs.correctOrWrongArea);
  var correctAnswer = document.createElement("div");
  correctAnswer.innerHTML = "Correct";
  correctAnswer.style.color = "green";
  additionalSection.appendChild(correctAnswer);
  timeoutID = setTimeout(clearCorrectAnswerField, 300, correctAnswer);
}

function clearCorrectAnswerField(correctAnswer) {
  clearArea(pageIDs.correctOrWrongArea);
  correctAnswer.innerHTML = "";
  lastQuestionChecker();
}

function delayTimerWrongAnswer() {
  var additionalSection = document.getElementById(pageIDs.correctOrWrongArea);
  var wrongAnswer = document.createElement("div");
  wrongAnswer.innerHTML = "Wrong";
  wrongAnswer.style.color = "red";
  additionalSection.appendChild(wrongAnswer);
  timeoutID = setTimeout(clearCorrectAnswerField, 300, wrongAnswer);
}

function clearCorrectAnswerField(wrongAnswer) {
  clearArea(pageIDs.correctOrWrongArea);
  wrongAnswer.innerHTML = "";
  lastQuestionChecker();
}

function mainPage() {
  clearAllSection();

  // Top Section BEGIN
  var topSection = document.getElementById(pageIDs.topSection);
  var viewHighScoresContainer = document.createElement("div");
  var viewHighScores = document.createElement("h3");
  viewHighScores.setAttribute("id", pageIDs.viewHighScores);
  viewHighScores.innerHTML = "View high scores";
  viewHighScoresContainer.appendChild(viewHighScores);
  topSection.appendChild(viewHighScoresContainer);

  var viewHighTimerContainer = document.createElement("div");
  var viewHighTimer = document.createElement("h3");
  viewHighTimer.innerHTML = "Time: ";

  viewHighTimerContainer.appendChild(viewHighTimer);

  var viewHighTimerValue = document.createElement("h3");
  viewHighTimerValue.setAttribute("id", pageIDs.timer);
  viewHighTimerValue.innerHTML = "0";

  viewHighTimerContainer.append(viewHighTimerValue);
  topSection.appendChild(viewHighTimerContainer);

  document
    .getElementById(pageIDs.viewHighScores)
    .addEventListener("click", function () {
      showResults();
    });
  // Top Section END

  // Main Section START
  var mainSection = document.getElementById(pageIDs.mainArea);
  var mainTextContainer = document.createElement("div");
  var mainTextH1 = document.createElement("h1");
  mainTextH1.innerHTML = "Coding Quiz Challenge";
  mainTextContainer.appendChild(mainTextH1);
  mainSection.appendChild(mainTextContainer);
  var mainTextH3Line1 = document.createElement("h3");
  mainTextH3Line1.innerHTML =
    "Try to answer the following code-related questions within the time limit.";
  mainTextContainer.appendChild(mainTextH3Line1);
  mainSection.appendChild(mainTextContainer);
  var mainTextH3Line2 = document.createElement("h3");
  mainTextH3Line2.innerHTML =
    "Keep in mind that incorrect answers will penalize your score/time";
  mainTextContainer.appendChild(mainTextH3Line2);
  mainSection.appendChild(mainTextContainer);
  var mainTextH3Line3 = document.createElement("h3");
  mainTextH3Line3.innerHTML = "by ten seconds!";
  mainTextContainer.appendChild(mainTextH3Line3);
  mainSection.appendChild(mainTextContainer);
  // Main Section END

  // Answer or additonal Section START
  var additionalSection = document.getElementById(pageIDs.answersArea);
  var buttonStarQuizContainer = document.createElement("div");
  var buttonStarQuiz = document.createElement("button");
  buttonStarQuiz.innerHTML = "Start Quiz";
  buttonStarQuizContainer.append(buttonStarQuiz);
  additionalSection.appendChild(buttonStarQuizContainer);
  additionalSection.style.margin = "auto";
  additionalSection.style.alignItems = "center";

  buttonStarQuiz.addEventListener("click", function () {
    startQuiz();
  });
  // Answer or additonal Section END
}

function startQuiz() {
  resetValues();
  clearArea(pageIDs.answersArea);

  showNextQuestion();
  repeatEverySecond();

  // Listener for answer area
  document
    .getElementById(pageIDs.answersArea)
    .addEventListener("click", function (e) {
      //Stop all listeners on the page (to fix an issue with double clicks after we start the quiz again)
      e.stopImmediatePropagation();
      if (e.target.classList.contains("answer")) {
        selectedAnswer = e.target;

        if (selectedAnswer !== null) {
          var selectedAnswerText = selectedAnswer.textContent.toLowerCase();
        }

        if (selectedAnswerText === questions[questionCounter].t.toLowerCase()) {
          finalScore++;
          delayTimerCorrectAnswer();
        } else {
          delayTimerWrongAnswer();
          timeSubtractor();
        }
      }
    });
}
