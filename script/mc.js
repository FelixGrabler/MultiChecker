let questions = [];
let current = 0;
let revealed = false;
let score = 0;

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Dynamisch die Dateiliste aus index.json laden
fetch("data/questions/index.json")
  .then((res) => res.json())
  .then((fileList) => {
    const listContainer = document.getElementById("source-list");
    fileList.forEach((file) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = file;
      checkbox.checked = true;
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + file));
      listContainer.appendChild(label);
      listContainer.appendChild(document.createElement("br"));
    });

    document.getElementById("load-selected").addEventListener("click", () => {
      const selectedFiles = [
        ...listContainer.querySelectorAll("input:checked"),
      ].map((cb) => cb.value);
      loadAndParseQuestions(selectedFiles);
    });
  });

function loadAndParseQuestions(files) {
  console.log("Loading questions from:", files);
  Promise.all(
    files.map((file) =>
      fetch("data/questions/" + file).then((res) => res.text())
    )
  ).then((contents) => {
    const allBlocks = contents.flatMap((text) =>
      text.split(/\n(?=\S)/).map((block) => block.trim())
    );
    questions = allBlocks.map((block, blockIndex) => {
      const lines = block.split("\n");
      const answers = lines.slice(1).map((a) => {
        const trimmed = a.trim();
        const isCorrect = trimmed.startsWith("*");
        const text = isCorrect ? trimmed.slice(1).trim() : trimmed;
        return {
          text: text,
          correct: isCorrect,
          checked: false,
        };
      });
      return {
        question: lines[0],
        answers: shuffleArray(answers),
      };
    });

    // Reset state
    current = 0;
    revealed = false;
    score = 0;
    document.getElementById("question-sources").style.display = "none";
    document.getElementById("controls").style.display = "block";
    render();
  });
}

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
