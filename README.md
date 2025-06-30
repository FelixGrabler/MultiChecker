# Learning Toolkit by Felix Grabler

This project is a simple, modular learning platform built with plain HTML, CSS, and JavaScript. It was originally created to prepare for the subject **Theoretische Informatik**, but the structure is general and can be adapted to anything really.

---

## Features

### 1. Multiple Choice

Presents a series of questions with multiple answers. You can select answers using checkboxes and see which ones are correct or incorrect after clicking "Next".

- Questions are organized in separate files within the [data/questions/](data/questions/) folder
- Each question file can focus on specific topics, allowing you to practice targeted areas
- The [data/questions/index.json](data/questions/index.json) file lists all available question files
- Correct answers are marked with an asterisk (`*`) at the beginning of the line

### 2. Definitions (Quizlet-style)

More flexible question style, website cannot check answer. Given is some text, and the user can reveal the answer which can be text and/or image.

- Cards are stored in [data/flashcards.json](data/flashcards.json)
- Supports text and images

### 3. Example Exercises

Displays practical tasks as images with solution images. This is meant for long tasks, but can also be used for anything.

- Tasks are listed in [data/examples.json](data/examples.json)
- Each entry has a title, task image, and solution image

---

## Structure

```
project-root/
├── index.html               # Multiple choice mode
├── quizlet.html             # Flashcard/definition mode
├── open.html                # Example task mode
├── data/
│   ├── questions/           # MC questions folder
│   │   ├── index.json       # List of available question files
│   │   ├── questions1.txt   # Question set 1
│   │   ├── questions2.txt   # Question set 2
│   │   └── questions3.txt   # Question set 3
│   ├── flashcards.json      # Definitions
│   ├── examples.json        # Practice examples
│   └── media/               # Image files for answers/tasks
├── script/
│   ├── mc.js
│   ├── quizlet.js
│   └── open.js
└── style.css
```

---

## How to Use

### Option 1: Use via GitHub Pages

You can access the project directly online without any setup:

[felixgrabler.github.io/MultiChecker](https://felixgrabler.github.io/MultiChecker/)

This link takes you to the hosted version of the project, where you can immediately start using the features. But, changing the input files is not possible here.

---

### Option 2: Use Locally

To run this project locally, you need to serve it with a basic local server due to browser security restrictions on file access.

One easy way to do this is to use Python's built-in HTTP server. Just execute this command in the project directory:

```bash
python3 -m http.server
```

Then open your browser at `http://localhost:8000/`

---

## 🧩 Customizing

To add or change content:

- Edit or add question files in `data/questions/` for multiple choice questions, and update `data/questions/index.json` to include new files
- Edit `data/flashcards.json` for definitions
- Edit `data/examples.json` and place new images in `data/media/` for tasks

---

## License & Usage

This project was developed by me for personal exam preparation.
You're free to **use, share, and modify** this project for any purpose.

---
