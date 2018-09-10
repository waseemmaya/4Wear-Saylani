const myQuestions = [
  {
    question: "Best Operating System?",
    answers: {
      a: "Windows",
      b: "Linux",
      c: "IOS"
    },
    correctAnswer: "a"
  },
  {
    question: "What is the best site ever created?",
    answers: {
      a: "SitePoint",
      b: "Simple Steps Code",
      c: "4Wear"
    },
    correctAnswer: "c"
  }
];

const quizDiv = document.getElementById("quiz");
const submitBtn = document.getElementById("submitBtn");
const resultDiv = document.getElementById("result");

function showQuestions() {
  var output = [];
  var answers;

  for (let i = 0; i < myQuestions.length; i++) {
    answers = [];

    for (opt in myQuestions[i].answers) {
      answers.push(
        "<label>" +
          '<input type="radio" name="question' +
          i +
          '" value="' +
          opt +
          '">' +
          opt +
          ": " +
          myQuestions[i].answers[opt] +
          "</label>"
      );
    }
    console.log(answers);
  }
}

showQuestions();
