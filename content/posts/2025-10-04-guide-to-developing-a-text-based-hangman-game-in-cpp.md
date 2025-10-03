---
title: "Guide to Developing a Text-Based Hangman Game in C++"
description: "A step-by-step tutorial on creating a classic hangman game, covering word list management, user input, and game loop logic using C++."
tags: ["C++", "Beginner", "Tutorial", "Hacktoberfest"]
author:
  name: "Priyanshi"
date: "2025-10-04"
cover: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000"
social:
  github: "Priyanshiunique"

---

## Introduction

Welcome! In this tutorial, we'll build a classic text-based Hangman game from scratch using C++. This project is perfect for beginners who want to practice fundamental concepts like loops, conditionals, strings, and user input. By the end, you'll have a fully functional game and a better grasp of C++ basics. 🚀


---

## Prerequisites

Before we start, you should have a basic understanding of:
* C++ syntax (variables, data types)
* Conditional statements (`if`/`else`)
* Loops (`while`, `for`)
* Basic `std::vector` and `std::string` usage
* A C++ compiler set up on your machine (like g++)

---

## Step 1: Setting Up the Project

Let's start by including the necessary headers and setting up our `main` function. We need headers for input/output, strings, vectors (for our word list), and random number generation to pick a word.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <ctime>
#include <algorithm>

// Function declarations will go here

int main() {
    // Game logic will go here
    return 0;
}


---

## Step 2: Creating and Choosing a Word

A Hangman game isn't complete without a list of words. We'll use a std::vector<std::string> to store them and write a function to select one randomly.

```cpp
// Chooses a random word from a vector of strings
std::string chooseRandomWord() {
    std::vector<std::string> words = {
        "programming", "computer", "algorithm", "developer",
        "keyboard", "software", "opensource", "repository"
    };
    
    // Seed the random number generator
    static std::mt19937 gen(time(0));
    std::uniform_int_distribution<> distrib(0, words.size() - 1);
    
    return words[distrib(gen)];
}


```
## Step 3: The Main Game Loop

The core of our game is a while loop that continues as long as the player has attempts left and hasn't guessed the word. First, let's set up the variables we need inside main:

```cpp
int main() {
    const std::string wordToGuess = chooseRandomWord();
    std::string displayedWord(wordToGuess.length(), '_');
    int attemptsLeft = 6;
    std::string guessedLetters = "";

    std::cout << "Welcome to Hangman!" << std::endl;

    while (attemptsLeft > 0 && displayedWord != wordToGuess) {
        // Game logic for each turn goes here
    }
    
    // Game over logic goes here
    
    return 0;
}


```

## Step 4: Handling a Player's Turn

Inside our while loop, we need to perform three actions every turn:

Display Status: Show the player the hidden word, attempts remaining, and letters they've already guessed.
Get Input: Prompt for a letter.
Process Guess: Check if the letter is in the word and update the game state.
Here is the code that goes inside the while loop:

```cpp
// Inside the while loop...

// 1. Display Status
std::cout << "\nWord: " << displayedWord << std::endl;
std::cout << "Attempts left: " << attemptsLeft << std::endl;
std::cout << "Guessed letters: " << guessedLetters << std::endl;

// 2. Get Input
char guess;
std::cout << "Guess a letter: ";
std::cin >> guess;
guess = tolower(guess); // Standardize to lowercase

// 3. Process Guess
if (guessedLetters.find(guess) != std::string::npos) {
    std::cout << "You already guessed that letter." << std::endl;
    continue;
}

guessedLetters += guess;
guessedLetters += " ";

size_t found = wordToGuess.find(guess);
if (found != std::string::npos) {
    std::cout << "Good guess!" << std::endl;
    for (size_t i = 0; i < wordToGuess.length(); ++i) {
        if (wordToGuess[i] == guess) {
            displayedWord[i] = guess;
        }
    }
} else {
    std::cout << "Incorrect guess." << std::endl;
    attemptsLeft--;
}


```
## Step 5: Winning and Losing

After the loop finishes, we check why it ended. If displayedWord matches wordToGuess, the player won. Otherwise, they ran out of attempts and lost.

Add this code after the while loop in main:

```cpp
// After the while loop...
if (displayedWord == wordToGuess) {
    std::cout << "\nCongratulations! You guessed the word: " << wordToGuess << std::endl;
} else {
    std::cout << "\nGame Over! The word was: " << wordToGuess << std::endl;
}


```
## The Complete Code

Here is the complete source code for our Hangman game. Happy coding!

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <random>
#include <ctime>
#include <algorithm>

// Chooses a random word from a vector of strings
std::string chooseRandomWord() {
    std::vector<std::string> words = {
        "programming", "computer", "algorithm", "developer",
        "keyboard", "software", "opensource", "repository"
    };
    
    static std::mt19937 gen(time(0));
    std::uniform_int_distribution<> distrib(0, words.size() - 1);
    
    return words[distrib(gen)];
}

int main() {
    const std::string wordToGuess = chooseRandomWord();
    std::string displayedWord(wordToGuess.length(), '_');
    int attemptsLeft = 6;
    std::string guessedLetters = "";

    std::cout << "=====================\n";
    std::cout << "  Welcome to Hangman!  \n";
    std::cout << "=====================\n";
    std::cout << "Guess the word. You have " << attemptsLeft << " attempts.\n";

    while (attemptsLeft > 0 && displayedWord != wordToGuess) {
        std::cout << "\n-----------------------------------\n";
        std::cout << "Word: " << displayedWord << std::endl;
        std::cout << "Attempts left: " << attemptsLeft << std::endl;
        std::cout << "Guessed letters: " << guessedLetters << std::endl;

        char guess;
        std::cout << "Guess a letter: ";
        std::cin >> guess;
        guess = tolower(guess);

        if (guessedLetters.find(guess) != std::string::npos) {
            std::cout << "You already guessed that letter. Try another." << std::endl;
            continue;
        }

        guessedLetters += guess;
        guessedLetters += " ";

        size_t found = wordToGuess.find(guess);
        if (found != std::string::npos) {
            std::cout << "Good guess!" << std::endl;
            for (size_t i = 0; i < wordToGuess.length(); ++i) {
                if (wordToGuess[i] == guess) {
                    displayedWord[i] = guess;
                }
            }
        } else {
            std::cout << "Incorrect guess." << std::endl;
            attemptsLeft--;
        }
    }

    std::cout << "\n=====================\n";
    if (displayedWord == wordToGuess) {
        std::cout << "  Congratulations! You won! \n";
        std::cout << " The word was: " << wordToGuess << std::endl;
    } else {
        std::cout << "      Game Over!       \n";
        std::cout << " The word was: " << wordToGuess << std::endl;
    }
    std::cout << "=====================\n\n";
    
    return 0;
}

```

