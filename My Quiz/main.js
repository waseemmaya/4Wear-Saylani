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
    // console.log(answers);
    for (opt in myQuestions[i].answers) {
      answers.push(
        '<label>'
        + '<input type="radio" name="question' + i + '" value="' + opt + '">'
        + opt + ': '
        + myQuestions[i].answers[opt]
        + '</label>'
      );


    }
    output.push(
      '<div class="question">' + myQuestions[i].question + '</div>'
      + '<div class="answers">' + answers.join('') + '</div>'
    );
    quizDiv.innerHTML = output.join('');
  }
  console.log("output",output);
  console.log("answers",answers);
  
}

showQuestions();
