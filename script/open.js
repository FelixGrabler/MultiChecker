let examples = [];
let current = 0;
let shown = false;

fetch("data/examples.json")
  .then((res) => res.json())
  .then((data) => {
    examples = data;
    renderExample();
  });

function renderExample() {
  const container = document.getElementById("example-container");
  container.innerHTML = "";

  if (current >= examples.length) {
    container.innerHTML = "<p>Alle Aufgaben durchgesehen.</p>";
    return;
  }

  const ex = examples[current];

  // Fortschritt oben anzeigen
  document.getElementById("example-progress").textContent = `Aufgabe ${
    current + 1
  } von ${examples.length}`;

  // Titel
  const title = document.createElement("h3");
  title.textContent = ex.title;
  container.appendChild(title);

  // Aufgabenbild
  const taskImg = document.createElement("img");
  taskImg.src = "data/media/" + ex.task;
  taskImg.alt = "Aufgabenstellung";
  taskImg.style.maxWidth = "100%";
  container.appendChild(taskImg);

  // Lösung
  if (shown && ex.solution) {
    const solutionImg = document.createElement("img");
    solutionImg.src = "data/media/" + ex.solution;
    solutionImg.alt = "Lösung";
    solutionImg.style.maxWidth = "100%";
    solutionImg.style.marginTop = "1em";
    container.appendChild(solutionImg);
  }

  // Buttons
  const toggleBtn = document.getElementById("toggle-solution");
  toggleBtn.textContent = shown ? "Lösung ausblenden" : "Lösung anzeigen";

  document.getElementById("prev-example").disabled = current === 0;

  const nextBtn = document.getElementById("next-example");
  if (current === examples.length - 1) {
    nextBtn.textContent = "Reset";
    nextBtn.disabled = false;
  } else {
    nextBtn.textContent = "Weiter";
    nextBtn.disabled = false;
  }
}

document.getElementById("toggle-solution").addEventListener("click", () => {
  shown = !shown;
  renderExample();
});

document.getElementById("next-example").addEventListener("click", () => {
  if (current === examples.length - 1) {
    current = 0;
    shown = false;
    renderExample();
  } else if (current < examples.length - 1) {
    current++;
    shown = false;
    renderExample();
  }
});

document.getElementById("prev-example").addEventListener("click", () => {
  if (current > 0) {
    current--;
    shown = false;
    renderExample();
  }
});
