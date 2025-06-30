let flashcards = [];
let current = 0;
let shown = false;

fetch("data/flashcards.json")
  .then((res) => res.json())
  .then((data) => {
    flashcards = data;
    renderCard();
  });

function renderCard() {
  const container = document.getElementById("flashcard-container");
  container.innerHTML = "";

  if (current >= flashcards.length) {
    container.innerHTML = "<p>Alle Karten durchgesehen.</p>";
    return;
  }

  const card = flashcards[current];

  // Fortschritt oben anzeigen
  document.getElementById("progress").textContent = `Definition ${
    current + 1
  } von ${flashcards.length}`;

  // Frage anzeigen
  const question = document.createElement("p");
  question.textContent = card.question;
  container.appendChild(question);

  // Antwort (nur wenn angezeigt werden soll)
  if (shown) {
    const answer = document.createElement("div");
    answer.classList.add("answer");

    // Text zuerst hinzufügen (über dem Bild)
    const text = document.createElement("p");
    text.textContent = card.answer;
    answer.appendChild(text);

    // Bild nach dem Text hinzufügen
    if (card.image) {
      const img = document.createElement("img");
      img.src = "data/media/" + card.image;
      img.alt = "Antwortbild";
      img.style.maxWidth = "100%";
      answer.appendChild(img);
    }

    container.appendChild(answer);
  }

  // Buttons aktualisieren
  const toggleBtn = document.getElementById("toggle-answer");
  toggleBtn.textContent = shown
    ? "Definition ausblenden"
    : "Definition anzeigen";

  document.getElementById("prev-card").disabled = current === 0;

  // Next-Button: "Weiter" oder "Reset" je nach Position
  const nextBtn = document.getElementById("next-card");
  if (current === flashcards.length - 1) {
    nextBtn.textContent = "Reset";
    nextBtn.disabled = false;
  } else {
    nextBtn.textContent = "Weiter";
    nextBtn.disabled = false;
  }
}

document.getElementById("toggle-answer").addEventListener("click", () => {
  shown = !shown;
  renderCard();
});

document.getElementById("next-card").addEventListener("click", () => {
  if (current === flashcards.length - 1) {
    // Reset: zurück zum Anfang
    current = 0;
    shown = false;
    renderCard();
  } else if (current < flashcards.length - 1) {
    current++;
    shown = false;
    renderCard();
  }
});

document.getElementById("prev-card").addEventListener("click", () => {
  if (current > 0) {
    current--;
    shown = false;
    renderCard();
  }
});
