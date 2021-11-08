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
    "How many characters is the minimum for an ideal password?",
    ["8", "4", "6", "7"],
    "6"
  ),
  new Question(
    "Who should you trust with your information?",
    ["Everyone", "Hackers", "The Internet", "A trusted few, but mainly nobody"],
    "A trusted few, but mainly nobody"
  ),
  new Question(
    "What is an example of a good antivirus to have?",
    ["Sasser", "360 Total Security", "Ophcrack", "John the Ripper"],
    "360 Total Security"
  ),
  new Question(
    "Which of these is not personal information?",
    [
      "Mother's Maiden Name",
      "Favorite Color",
      "Social Security Number",
      "Address"
    ],
    "Favorite Color"
  ),

  new Question(
    "Should you tell your friend what your Gmail password is?",
    ["Nope", "Always", "Yes, sharing is caring", "If they really need it"],
    "Nope"
  ),
  new Question(
    "What does a firewall do?",
    ["Stop fires", "Block malware", "Store files", "Control user accounts"],
    "Block malware"
  ),
  new Question(
    "Should remote access be enabled on your computer?",
    [
      "Never",
      "All the Time",
      "Only if your friend asks for access",
      "Occasionally"
    ],
    "Never"
  )
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
