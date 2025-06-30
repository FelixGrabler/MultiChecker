# 📁 Data Folder

This folder contains the content used by the learning interface.  
Each file serves a specific mode: Multiple Choice, Definitions, or Example Exercises.

---

## [questions.txt](questions.txt)

Used in the **Multiple Choice** mode (`index.html`).

- Each question block starts with the question text
- Each answer is indented with a tab (`\t`)
- Correct answers must begin with an asterisk `*`
- Multiple correct answers are allowed
- Question blocks are separated by an empty line or by starting a new line without indentation

**Example:**
```
A cognitive walkthrough is a
	*usability inspection method
	usability testing method
	*task-oriented walkthrough
	walkthrough where users apply cognition to solve a task
	walkthrough based on users thinking aloud

A diary study
	*involves self-reporting of activities by users
	*provides insight into how software is used
	*is a exploratory evaluation method
	is a predictive evaluation method
	is a summative evaluation method
	is a formative evaluation method
	involves time-consuming manual analysis of user sessions
```

---

## 🧠 [flashcards.json](flashcards.json)

Used in the **Definition Cards** mode (`quizlet.html`).

Each entry must have:
- `question`: the prompt or title of the card
- `answer`: the full answer or definition
- `image` *(optional)*: path to an image located in `data/media/`

**Example:**
```json
[
  {
    "question": "Was ist ein DEA? (Definition)",
    "answer": "Ein deterministischer endlicher Automat ist ein ...",
    "image": "dea.png"
  },
  {
    "question": "Was ist eine Turingmaschine? (Definition)",
    "answer": "Eine Turingmaschine ist ein 7 Tupel, ..."
  }
]
```

---

## 📝 [examples.json](examples.json)

Used in the **Example Tasks** mode (`open.html`).

Each entry must include:
- `title`: title of the task
- `task`: filename of an image showing the task
- `solution`: filename of an image showing the solution

All images must be placed in the `data/media/` directory.

**Example:**
```json
[
  {
    "title": "DEA Konstruieren",
    "task": "example1.png",
    "solution": "solution1.png"
  },
  {
    "title": "DEA Konstruieren 2",
    "task": "example2.png",
    "solution": "solution2.png"
  }
]
```

---

