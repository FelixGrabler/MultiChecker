let cards = [];
let currentCard = 0;

fetch("data/flashcards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = data;
    showCard();
  });

function showCard() {
  const q = document.getElementById("question");
  const a = document.getElementById("answer");
  const img = document.getElementById("answer-img");

  q.textContent = cards[currentCard].question;
  a.style.display = "none";
  img.style.display = "none";

  document.getElementById("show-answer").onclick = () => {
    a.textContent = cards[currentCard].answer;
    a.style.display = "block";
    if (cards[currentCard].image) {
      img.src = "data/media/" + cards[currentCard].image;
      img.style.display = "block";
    }
  };

  document.getElementById("next").onclick = () => {
    currentCard = (currentCard + 1) % cards.length;
    showCard();
  };
}
