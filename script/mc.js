let questions = [];
let current = 0;
let revealed = false;
let score = 0;

fetch("data/questions.txt")
  .then((res) => res.text())
  .then((text) => {
    const blocks = text.split(/\n(?=\S)/);
    console.log("Blocks found:", blocks.length);
    questions = blocks.map((block, blockIndex) => {
      const lines = block.trim().split("\n");
      console.log(`Block ${blockIndex}:`, lines);
      return {
        question: lines[0],
        answers: lines.slice(1).map((a) => {
          const trimmedAnswer = a.trim();
          const isCorrect = trimmedAnswer.startsWith("*");
          const text = isCorrect
            ? trimmedAnswer.substring(1).trim()
            : trimmedAnswer;
          console.log(
            `Answer: "${a}" -> trimmed: "${trimmedAnswer}" -> isCorrect: ${isCorrect} -> text: "${text}"`
          );
          return {
            text: text,
            correct: isCorrect,
            checked: false,
          };
        }),
      };
    });

    // Log summary of correct/incorrect answers per question
    questions.forEach((q, i) => {
      const correctCount = q.answers.filter((a) => a.correct).length;
      const incorrectCount = q.answers.filter((a) => !a.correct).length;
      console.log(
        `Question ${
          i + 1
        }: ${correctCount} correct, ${incorrectCount} incorrect answers`
      );
    });

    render();
  });

function render() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (current >= questions.length) {
    container.innerHTML = `<p>Du hast ${score} von ${questions.length} Fragen richtig beantwortet.</p>`;
    document.getElementById("controls").innerHTML =
      '<button id="reset">Reset</button>';
    document.getElementById("reset").addEventListener("click", () => {
      location.reload();
    });
    document.getElementById("score").textContent = "";
    return;
  }

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
    checkbox.checked = a.checked;

    checkbox.addEventListener("change", (e) => {
      a.checked = e.target.checked;
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + a.text));
    label.classList.add("answer");

    if (revealed) {
      if (a.correct) {
        label.classList.add("correct");
      } else if (a.checked && !a.correct) {
        label.classList.add("incorrect");
      }
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
  const q = questions[current];
  if (!revealed) {
    revealed = true;
    const correct = q.answers.every((a) => a.correct === a.checked);
    if (correct) score++;
    render();
  } else {
    revealed = false;
    current++;
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
