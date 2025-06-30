let examples = [];
let currentExample = 0;

fetch("data/examples.json")
  .then((res) => res.json())
  .then((data) => {
    examples = data;
    showExample();
  });

function showExample() {
  const title = document.getElementById("example-title");
  const taskImg = document.getElementById("example-img");
  const solutionImg = document.getElementById("solution-img");

  const ex = examples[currentExample];
  title.textContent = ex.title;
  taskImg.src = "data/media/" + ex.task;
  solutionImg.src = "data/media/" + ex.solution;
  solutionImg.style.display = "none";

  document.getElementById("show-solution").onclick = () => {
    solutionImg.style.display = "block";
  };

  document.getElementById("next-example").onclick = () => {
    currentExample = (currentExample + 1) % examples.length;
    showExample();
  };
}
