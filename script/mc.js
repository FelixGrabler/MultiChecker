let questions = [];
let current = 0;
let revealed = false;
let score = 0;

fetch("data/questions.txt")
  .then((res) => res.text())
  .then((text) => {
    const blocks = text.split(/\n(?=\S)/);
    questions = blocks.map((block) => {
      const lines = block.trim().split("\n");
      return {
        question: lines[0],
        answers: lines.slice(1).map((a) => ({
          text: a.replace(/^\*/, ""),
          correct: a.startsWith("*"),
        })),
      };
    });
    render();
  });

function render() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";
  const q = questions[current];

  const qEl = document.createElement("p");
  qEl.textContent = q.question;
  container.appendChild(qEl);

  q.answers.forEach((a, i) => {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.disabled = revealed;
    checkbox.dataset.index = i;
    checkbox.checked = !!a.checked;

    checkbox.addEventListener("change", (e) => {
      q.answers[i].checked = e.target.checked;
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + a.text));
    label.classList.add("answer");
    if (revealed) {
      if (a.correct && a.checked) label.classList.add("correct");
      else if (!a.correct && a.checked) label.classList.add("incorrect");
    }
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });

  document.getElementById("score").textContent = `Frage ${current + 1} von ${
    questions.length
  }`;
  document.getElementById("prev").disabled = current === 0;
}

document.getElementById("next").addEventListener("click", () => {
  if (!revealed) {
    revealed = true;
    const q = questions[current];
    const correct = q.answers.every((a) => a.correct === !!a.checked);
    if (correct) score++;
    render();
  } else {
    revealed = false;
    if (current < questions.length - 1) current++;
    render();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (current > 0) {
    current--;
    revealed = false;
    render();
  }
});
