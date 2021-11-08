function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
};

Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }

  this.questionIndex++;
};

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
};

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    // show question
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    // show options
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  };
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
}

// create questions here
var questions = [
  new Question(
    "What is malware?",
    [
      "Harmful software",
      "AKA Windows Defender",
      "A firewall extension",
      "A good thing"
    ],
    "Harmful software"
  ),
  new Question(
    "What is a trojan horse?",
    [
      "Innocent looking but harmful program",
      "The wooden horse from the Illiad",
      "A pop-up on your laptop",
      "A type of horse"
    ],
    "Innocent looking but harmful program"
  ),
  new Question(
    "What is a worm?",
    [
      "The thing on sidwalks after it rains",
      "Malware that replicates itself",
      "Malware that stays the same",
      "I'm not really sure"
    ],
    "Malware that replicates itself"
  ),
  new Question(
    "What is a scam?",
    ["A dishonest act", "An honest act", "An annoying act", "A funny act"],
    "A dishonest act"
  ),
  new Question(
    "What is phishing?",
    [
      "Sitting next to a lake and trying to catch fish",
      "A way to sell personal information",
      "Online scam to get personal information",
      "Something relating to torjan horses"
    ],
    "Online scam to get personal information"
  ),
  new Question(
    "What is an anti-virus software?",
    [
      "A backdoor for malware to access your computer",
      "Software that protects your computer from malware",
      "A game you can play with your friends",
      "Something you should never have on your computer"
    ],
    "Software that protects your computer from malware"
  )
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
