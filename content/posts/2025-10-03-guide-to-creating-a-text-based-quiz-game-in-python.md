---
title: "Guide to Creating a Text-Based Quiz Game in Python"
description: "Learn how to build an interactive text-based quiz game in Python from scratch. Perfect for beginners to practice control flow, data structures, and user input handling."
tags: ["Python", "Beginner", "Tutorial", "Game Development", "Programming", "Interactive", "Command Line"]
author:
  name: "Siddharth Panditrao"
date: "2025-10-03"
cover: "https://images.unsplash.com/photo-1649180556628-9ba704115795?q=80&w=1724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
social:
  github: "WalkingDevFlag"
  twitter: "WalkingDevFlag"
  linkedin: "siddharth-panditrao"
---

# Build a Quiz Application With Python

In this tutorial, you'll build a Python quiz application for the terminal, starting with basic question/answer functionality and progressing to features like user-friendly interfaces, external data storage, multiple correct answers, hints, and explanations.

## What You'll Learn

- Build a beginner-friendly project using Python data structures and control flow
- Use the `input()` function for terminal interaction
- Structure questions and answers in TOML data files
- Implement multiple correct answers, hints, and explanations
- Support different quiz topics

You'll create an application that tests knowledge on various topics, with multiple-choice questions, optional hints, and educational explanations after each answer.

## Project Overview

You'll build the quiz application iteratively through these steps:

1. **Create a basic application** that can ask multiple-choice questions
2. **Make the app more user-friendly** by improving how it looks and how it handles user errors
3. **Refactor the code** to use functions
4. **Separate question data** from source code by storing questions in a dedicated data file
5. **Expand the app** to handle multiple correct answers, give hints, and provide explanations
6. **Add interest** by supporting different quiz topics to choose from

## Prerequisites

You should be comfortable with:
- Reading input from the user at the terminal
- Organizing data in lists, tuples, and dictionaries
- Using if statements and for/while loops
- Encapsulating code with functions

## Step 1: Ask Questions

### Get User Information With `input()`

One of Python's most useful built-in functions is `input()`, which allows your program to interact with users by reading what they type in the terminal. This function pauses your program's execution and waits for the user to enter something and press Enter. Whatever the user types gets returned as a string that you can store in a variable.

The `input()` function takes an optional prompt string that's displayed to the user before they enter their response. This prompt helps users understand what information you're asking for. Here's how it works:

```python
>>> name = input("What's your GitHub username? ")
What's your GitHub username? WalkingDevFlag
>>> name
'WalkingDevFlag'
```

**Important:** `input()` always returns a text string, even if the user enters numbers. You'll need to convert the string to another type if you want to perform mathematical operations.

### Use Data Structures to Avoid Repetition

A quiz with only one question isn't very useful! You could copy and paste the code multiple times for different questions, but that violates the DRY (Don't Repeat Yourself) principle. Instead, you'll use Python's data structures to store multiple questions and loop through them.

A simple approach is to store questions as a list of tuples, where each tuple contains the question text and its correct answer. Then you can use a `for` loop to iterate through all questions:

```python
QUESTIONS = [
    ("What does API stand for", "Application Programming Interface"),
    ("Which language is primarily used for web styling", "CSS"),
]

for question, correct_answer in QUESTIONS:
    answer = input(f"{question}? ")
    if answer == correct_answer:
        print("Correct!")
    else:
        print(f"The answer is {correct_answer!r}, not {answer!r}")
```

### Provide Multiple Choices

Requiring users to type exact answers can be frustrating—a small typo means they get marked wrong even if they know the answer. Multiple-choice questions solve this problem by giving users a set of options to choose from.

You'll update your data structure to a dictionary where each key is a question and each value is a list of answer alternatives. By convention, you'll put the correct answer as the first item in the list. To make it user-friendly, you'll also add numbered labels so users can simply enter a number instead of typing out the full answer:

```python
from string import ascii_lowercase

QUESTIONS = {
    "What does Git stand for": [
        "Global Information Tracker", "Get It There", "General Interface Tool", "Great Iteration Technology"
    ],
    "Which company created the React library": [
        "Facebook", "Google", "Microsoft", "Amazon"
    ],
}

for question, alternatives in QUESTIONS.items():
    correct_answer = alternatives[0]
    sorted_alternatives = sorted(alternatives)
    for label, alternative in enumerate(sorted_alternatives):
        print(f"  {label}) {alternative}")

    answer_label = int(input(f"{question}? "))
    answer = sorted_alternatives[answer_label]
    if answer == correct_answer:
        print("Correct!")
    else:
        print(f"The answer is {correct_answer!r}, not {answer!r}")
```

Now users can simply enter a number instead of typing the full answer!

## Step 2: Make Your Application User-Friendly

Now that you have a working quiz application, it's time to polish it and make it more enjoyable to use. In this step, you'll focus on the user experience by improving the visual layout, tracking scores, handling errors gracefully, and adding some randomness to keep things interesting.

### Format the Output More Nicely

Right now, your quiz output is a bit plain and hard to follow. You'll improve this by numbering the questions, using lowercase letters (a, b, c, d) instead of numbers for answer choices, and adding some spacing to make everything more readable. You'll also add score tracking so users know how well they're doing, and implement error handling to gracefully deal with invalid input.

Here's a more polished version that combines these improvements:

```python
from string import ascii_lowercase

QUESTIONS = {
    "What does HTTP stand for": [
        "HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Process", "Home Tool Transfer Protocol",
    ],
}

num_correct = 0
for num, (question, alternatives) in enumerate(QUESTIONS.items(), start=1):
    print(f"\nQuestion {num}:")
    print(f"{question}?")
    correct_answer = alternatives[0]
    labeled_alternatives = dict(zip(ascii_lowercase, sorted(alternatives)))
    for label, alternative in labeled_alternatives.items():
        print(f"  {label}) {alternative}")

    while (answer_label := input("\nChoice? ")) not in labeled_alternatives:
        print(f"Please answer one of {', '.join(labeled_alternatives)}")

    answer = labeled_alternatives[answer_label]
    if answer == correct_answer:
        num_correct += 1
        print("⭐ Correct! ⭐")
    else:
        print(f"The answer is {correct_answer!r}, not {answer!r}")

print(f"\nYou got {num_correct} correct out of {num} questions")
```

You use `string.ascii_lowercase` to get letters that label your alternatives, track the score with `num_correct`, and use the walrus operator (`:=`) to handle invalid input gracefully.

### Add Variety to Your Quiz

If questions always appear in the same order with alternatives in the same positions, users can memorize the pattern rather than learning the material. Adding randomness makes your quiz more challenging and educational.

You can use `random.sample()` to shuffle both the order of questions and the order of answer alternatives. This ensures that each time someone takes the quiz, they get a fresh experience. You can also limit the number of questions per quiz attempt, making it more manageable.

## Step 3: Organize Your Code With Functions

As your quiz application grows, having all the code in one long script becomes hard to manage and understand. It's time to refactor—reorganizing your code to make it cleaner and more maintainable without changing how it works.

Functions help you break down complex programs into smaller, reusable pieces. Each function should have a single, clear purpose. This makes your code easier to read, test, and debug. It also makes it easier to add new features later.

Most applications follow a common life cycle:

1. **Preprocess:** Prepare initial data (load questions, shuffle them)
2. **Process:** Run main loop (ask questions, collect answers)
3. **Postprocess:** Clean up and close application (show final score)

Let's reorganize your quiz application using functions that follow this pattern:

```python
import random
from string import ascii_lowercase

NUM_QUESTIONS_PER_QUIZ = 5
QUESTIONS = {
    "Which file extension is used for Python files": [
        ".py",
        ".python",
        ".pt",
        ".pyt",
    ],
    "What is the command to install packages in Python": [
        "pip install",
        "python install",
        "py get",
        "install package",
    ]
}

def prepare_questions(questions, num_questions):
    num_questions = min(num_questions, len(questions))
    return random.sample(list(questions.items()), k=num_questions)

def get_answer(question, alternatives):
    print(f"{question}?")
    labeled_alternatives = dict(zip(ascii_lowercase, alternatives))
    for label, alternative in labeled_alternatives.items():
        print(f"  {label}) {alternative}")

    while (answer_label := input("\nChoice? ")) not in labeled_alternatives:
        print(f"Please answer one of {', '.join(labeled_alternatives)}")

    return labeled_alternatives[answer_label]

def ask_question(question, alternatives):
    correct_answer = alternatives[0]
    ordered_alternatives = random.sample(alternatives, k=len(alternatives))

    answer = get_answer(question, ordered_alternatives)
    if answer == correct_answer:
        print("⭐ Correct! ⭐")
        return 1
    else:
        print(f"The answer is {correct_answer!r}, not {answer!r}")
        return 0

def run_quiz():
    questions = prepare_questions(
        QUESTIONS, num_questions=NUM_QUESTIONS_PER_QUIZ
    )

    num_correct = 0
    for num, (question, alternatives) in enumerate(questions, start=1):
        print(f"\nQuestion {num}:")
        num_correct += ask_question(question, alternatives)

    print(f"\nYou got {num_correct} correct out of {num} questions")

if __name__ == "__main__":
    run_quiz()
```

The code is now much more organized with clear responsibilities for each function!

## Step 4: Separate Data Into Its Own File

Right now, your questions are hard-coded directly in your Python script. This works, but it has limitations. If someone wants to add questions, they need to edit your code and understand Python syntax. It's also harder to maintain and share question sets.

A better approach is to separate data from code by storing questions in a dedicated data file. This makes it easy for anyone to add or modify questions without touching your code.

### Move Questions to a TOML File

You'll use TOML (Tom's Obvious, Minimal Language), a human-friendly configuration file format that's easy to read and write. Python 3.11+ includes built-in TOML support via `tomllib`, but for earlier versions, you'll need to install the `tomli` library:

```bash
pip install tomli
```

Create `questions.toml`:

```toml
[[questions]]
question = "What is the default port for HTTP"
answer = "80"
alternatives = ["443", "8080", "3000"]

[[questions]]
question = "Which symbol is used for comments in Python"
answer = "#"
alternatives = ["//", "/*", "--"]
```

Update your code:

```python
import pathlib
import random
from string import ascii_lowercase

try:
    import tomllib
except ModuleNotFoundError:
    import tomli as tomllib

NUM_QUESTIONS_PER_QUIZ = 5
QUESTIONS_PATH = pathlib.Path(__file__).parent / "questions.toml"

def prepare_questions(path, num_questions):
    questions = tomllib.loads(path.read_text())["questions"]
    num_questions = min(num_questions, len(questions))
    return random.sample(questions, k=num_questions)

def get_answer(question, alternatives):
    print(f"{question}?")
    labeled_alternatives = dict(zip(ascii_lowercase, alternatives))
    for label, alternative in labeled_alternatives.items():
        print(f"  {label}) {alternative}")

    while (answer_label := input("\nChoice? ")) not in labeled_alternatives:
        print(f"Please answer one of {', '.join(labeled_alternatives)}")

    return labeled_alternatives[answer_label]

def ask_question(question):
    correct_answer = question["answer"]
    alternatives = [question["answer"]] + question["alternatives"]
    ordered_alternatives = random.sample(alternatives, k=len(alternatives))

    answer = get_answer(question["question"], ordered_alternatives)
    if answer == correct_answer:
        print("⭐ Correct! ⭐")
        return 1
    else:
        print(f"The answer is {correct_answer!r}, not {answer!r}")
        return 0

def run_quiz():
    questions = prepare_questions(
        QUESTIONS_PATH, num_questions=NUM_QUESTIONS_PER_QUIZ
    )

    num_correct = 0
    for num, question in enumerate(questions, start=1):
        print(f"\nQuestion {num}:")
        num_correct += ask_question(question)

    print(f"\nYou got {num_correct} correct out of {num} questions")

if __name__ == "__main__":
    run_quiz()
```

## Step 5: Expand Your Quiz Functionality

Your quiz application is functional, but you can make it more powerful and educational by adding advanced features. In this step, you'll implement support for questions with multiple correct answers, optional hints to help users, and explanations that provide additional learning context after each question.

### Allow Multiple Correct Answers

Some questions naturally have more than one correct answer. For example, "Which of these are valid ways to create a list in Python?" could have multiple correct options. To support this, you'll update your data structure to use `answers` (plural) instead of `answer`, and modify your code to accept and validate multiple selections.

Users will be able to enter multiple answers separated by commas (like "a, c") or spaces. Your code needs to handle this input, validate each choice, and check that all correct answers were selected:

```python
def get_answers(question, alternatives, num_choices=1):
    print(f"{question}?")
    labeled_alternatives = dict(zip(ascii_lowercase, alternatives))
    for label, alternative in labeled_alternatives.items():
        print(f"  {label}) {alternative}")

    while True:
        plural_s = "" if num_choices == 1 else f"s (choose {num_choices})"
        answer = input(f"\nChoice{plural_s}? ")
        answers = set(answer.replace(",", " ").split())

        # Handle invalid answers
        if len(answers) != num_choices:
            plural_s = "" if num_choices == 1 else "s, separated by comma"
            print(f"Please answer {num_choices} alternative{plural_s}")
            continue

        if any(
            (invalid := answer) not in labeled_alternatives
            for answer in answers
        ):
            print(
                f"{invalid!r} is not a valid choice. "
                f"Please use {', '.join(labeled_alternatives)}"
            )
            continue

        return [labeled_alternatives[answer] for answer in answers]

def ask_question(question):
    correct_answers = question["answers"]
    alternatives = question["answers"] + question["alternatives"]
    ordered_alternatives = random.sample(alternatives, k=len(alternatives))

    answers = get_answers(
        question=question["question"],
        alternatives=ordered_alternatives,
        num_choices=len(correct_answers),
    )
    if set(answers) == set(correct_answers):
        print("⭐ Correct! ⭐")
        return 1
    else:
        is_or_are = " is" if len(correct_answers) == 1 else "s are"
        print("\n- ".join([f"No, the answer{is_or_are}:"] + correct_answers))
        return 0
```

### Add Hints to Help the User

Sometimes users get stuck on a question and need a little nudge in the right direction. Adding optional hints makes your quiz more interactive and less frustrating. Users can choose to see a hint by entering "?" as their answer.

Hints should give enough information to help users think through the problem without directly revealing the answer. They're especially useful for educational quizzes where the goal is learning rather than just testing. Here's how to add hint support:

```python
def get_answers(question, alternatives, num_choices=1, hint=None):
    print(f"{question}?")
    labeled_alternatives = dict(zip(ascii_lowercase, alternatives))
    if hint:
        labeled_alternatives["?"] = "Hint"
    for label, alternative in labeled_alternatives.items():
        print(f"  {label}) {alternative}")

    while True:
        plural_s = "" if num_choices == 1 else f"s (choose {num_choices})"
        answer = input(f"\nChoice{plural_s}? ")
        answers = set(answer.replace(",", " ").split())

        # Handle hints
        if hint and "?" in answers:
            print(f"\nHINT: {hint}")
            continue

        # Handle invalid answers
        if len(answers) != num_choices:
            plural_s = "" if num_choices == 1 else "s, separated by comma"
            print(f"Please answer {num_choices} alternative{plural_s}")
            continue

        if any(
            (invalid := answer) not in labeled_alternatives
            for answer in answers
        ):
            print(
                f"{invalid!r} is not a valid choice. "
                f"Please use {', '.join(labeled_alternatives)}"
            )
            continue

        return [labeled_alternatives[answer] for answer in answers]

def ask_question(question):
    correct_answers = question["answers"]
    alternatives = question["answers"] + question["alternatives"]
    ordered_alternatives = random.sample(alternatives, k=len(alternatives))

    answers = get_answers(
        question=question["question"],
        alternatives=ordered_alternatives,
        num_choices=len(correct_answers),
        hint=question.get("hint"),
    )
    if set(answers) == set(correct_answers):
        print("⭐ Correct! ⭐")
        return 1
    else:
        is_or_are = " is" if len(correct_answers) == 1 else "s are"
        print("\n- ".join([f"No, the answer{is_or_are}:"] + correct_answers))
        return 0
```

### Add Explanations to Reinforce Learning

Showing users whether they got a question right or wrong is good, but explaining why reinforces learning. Explanations can provide context, correct common misconceptions, or offer additional interesting information related to the question.

Unlike hints (which appear before answering), explanations appear after the user submits their answer—whether they got it right or wrong. This is the perfect time to provide educational content. Add optional explanation fields to your questions and display them after each answer:

```python
def ask_question(question):
    correct_answers = question["answers"]
    alternatives = question["answers"] + question["alternatives"]
    ordered_alternatives = random.sample(alternatives, k=len(alternatives))

    answers = get_answers(
        question=question["question"],
        alternatives=ordered_alternatives,
        num_choices=len(correct_answers),
        hint=question.get("hint"),
    )

    if correct := (set(answers) == set(correct_answers)):
        print("⭐ Correct! ⭐")
    else:
        is_or_are = " is" if len(correct_answers) == 1 else "s are"
        print("\n- ".join([f"No, the answer{is_or_are}:"] + correct_answers))

    if "explanation" in question:
        print(f"\nEXPLANATION:\n{question['explanation']}")

    return 1 if correct else 0
```

## Step 6: Support Several Quiz Topics

So far, your quiz mixes all questions together. But what if you want to create quizzes on different subjects—Python programming, web development, data science, etc.? Users might want to focus on a specific topic instead of getting random questions from all areas.

In this final step, you'll add support for organizing questions into different topics. When the quiz starts, users will be asked to choose which topic they want to be quizzed on. This makes your application more flexible and useful.

You'll use TOML's nested structure to organize questions by topic. Each topic has a label (for display) and a nested array of questions. Here's how to implement this:

```python
def prepare_questions(path, num_questions):
    topic_info = tomllib.loads(path.read_text())
    topics = {
        topic["label"]: topic["questions"] for topic in topic_info.values()
    }
    topic_label = get_answers(
        question="Which topic do you want to be quizzed about",
        alternatives=sorted(topics),
    )[0]

    questions = topics[topic_label]
    num_questions = min(num_questions, len(questions))
    return random.sample(questions, k=num_questions)
```

## Conclusion

Congratulations! You've created a powerful Python quiz application. You've learned how to:

- Interact with users using `input()`
- Improve usability with formatting, error handling, and randomization
- Refactor code into well-organized functions
- Store data in TOML files
- Handle multiple correct answers, hints, and explanations
- Support multiple topics with nested data structures

You can continue to expand it by adding more questions and topics, implementing difficulty levels, saving high scores, adding timers, or creating a GUI with Tkinter or PyQt.

Now go have some fun with your quiz application. Add your own questions, and challenge your friends!
