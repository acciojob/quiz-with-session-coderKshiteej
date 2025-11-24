//your JS code here.

// ---- GLOBAL VARIABLES ----
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Retrieve saved answers from session storage OR default to empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// ---- RENDER QUESTIONS ----
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear before rendering

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    // Outer question div
    const questionDiv = document.createElement("div");

    // Question text
    const qText = document.createElement("p");
    qText.textContent = question.question;
    questionDiv.appendChild(qText);

    // Create multiple choice options
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // If previously chosen, mark selected
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // When answer is selected → save to sessionStorage
      radio.addEventListener("change", function () {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionDiv.appendChild(radio);
      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// ---- SUBMIT QUIZ ----
submitBtn.addEventListener("click", function () {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display score
  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save in localStorage
  localStorage.setItem("score", score);
});

// ---- SHOW LAST SCORE IF PAGE RELOADED AFTER SUBMISSION ----
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreDiv.textContent = `Your score is ${storedScore} out of 5.`;
}
