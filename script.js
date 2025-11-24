const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreBox = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Render Questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before re-render

  for (let i = 0; i < questions.length; i++) {
    const qDiv = document.createElement("div");

    const qText = document.createElement("p");
    qText.textContent = questions[i].question;
    qDiv.appendChild(qText);

    for (let j = 0; j < questions[i].choices.length; j++) {
      const choice = questions[i].choices[j];

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${i}`;
      radio.value = choice;

      // Restore from sessionStorage
      if (userAnswers[i] === choice) {
        radio.checked = true;
      }

      // Save progress on click
      radio.addEventListener("click", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      qDiv.appendChild(radio);
      qDiv.appendChild(document.createTextNode(choice));
    }

    questionsElement.appendChild(qDiv);
  }
}

renderQuestions();


// Submit Quiz
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  scoreBox.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
