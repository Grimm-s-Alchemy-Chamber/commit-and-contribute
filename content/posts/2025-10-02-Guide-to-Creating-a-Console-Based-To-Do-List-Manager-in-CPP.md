---
title: "Guide to Creating a Console-Based To-Do List Manager in C++"
description: "Step-by-step tutorial on building a to-do list app using vectors for task storage, file I/O for persistence, and functions for adding, viewing, and deleting tasks."
tags: ["Beginner", "OpenSource", "C++"]
author:
  name: "prathamesh424"
date: "2025-10-02"
social:
  github: "prathamesh424"
  twitter: "Prathamesh_G24"
---


## Introduction

Building small projects is one of the best ways to solidify your programming skills. In this tutorial, we'll create a practical and useful command-line application: a to-do list manager. This project is perfect for beginners looking to get comfortable with some of the most important features of C++, including data structures, file handling, and modular programming.

We will build a to-do list with the following core features:
*   **Add** new tasks.
*   **View** all tasks with their status (completed or pending).
*   **Mark** a task as completed.
*   **Delete** a task.
*   **Save** tasks to a file so your list persists even after you close the program.

To accomplish this, we will use `std::vector` for dynamic task storage, `fstream` for reading from and writing to files, and a `struct` to define what a task is.

### Prerequisites

*   A basic understanding of C++ syntax (variables, loops, functions).
*   A C++ compiler installed on your system (like g++, Clang, or the compiler included with Visual Studio).
*   A text editor or IDE (like VS Code, CLion, or Visual Studio).

## Step 1: Defining the Task Structure

First, we need a way to represent a single task. A task has two key properties: its description (what you need to do) and its status (is it done yet?). A C++ `struct` is the perfect tool for bundling this data together.

Let's create a `Task` struct.

```cpp
#include <string>

struct Task {
    std::string description;
    bool completed;
};
```
This simple structure defines the blueprint for every to-do item in our application. We initialize `completed` to `false` by default to ensure new tasks are always marked as pending.

## Step 2: Handling File Input/Output (I/O)

To make our to-do list useful, it needs to remember the tasks between sessions. We'll accomplish this by saving the tasks to a text file. This requires two key functions: one to load tasks from the file when the program starts, and one to save them when it exits.

We'll use `<fstream>` for this. Our file format will be simple: each line will represent one task, starting with a `1` or `0` for completion status, followed by the description.
Example `tasks.txt`:
```
0 Go to the grocery store
1 Finish the C++ project
0 Call the dentist
```

Here are the functions to handle loading and saving:

```cpp
#include <vector>
#include <fstream>
#include <iostream>
#include <string>

// ... (include the Task struct here)

// Function to load tasks from a file into a vector
void loadTasksFromFile(std::vector<Task>& tasks, const std::string& filename) {
    std::ifstream inputFile(filename);
    if (!inputFile.is_open()) {
        // File doesn't exist or can't be opened, so we start fresh.
        return;
    }

    Task tempTask;
    char completedChar;
    while (inputFile >> completedChar && std::getline(inputFile, tempTask.description)) {
        // We read the status character first, then the rest of the line for the description.
        // The leading space before the description is consumed by getline.
        tempTask.completed = (completedChar == '1');
        // Correctly handle the leading space that getline might leave.
        if (!tempTask.description.empty() && tempTask.description == ' ') {
            tempTask.description = tempTask.description.substr(1);
        }
        tasks.push_back(tempTask);
    }
    inputFile.close();
}

// Function to save the vector of tasks to a file
void saveTasksToFile(const std::vector<Task>& tasks, const std::string& filename) {
    std::ofstream outputFile(filename);
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not open the file for writing." << std::endl;
        return;
    }

    for (const auto& task : tasks) {
        outputFile << task.completed << " " << task.description << std::endl;
    }
    outputFile.close();
}
```

## Step 3: Implementing Core To-Do List Functions

Now let's build the functions for our application's main features. Keeping each piece of logic in its own function makes our code clean and easy to manage.

### Viewing Tasks
This function will iterate through our `vector` of tasks and print them in a nicely formatted list.

```cpp
void viewTasks(const std::vector<Task>& tasks) {
    std::cout << "\n--- To-Do List ---" << std::endl;
    if (tasks.empty()) {
        std::cout << "Your to-do list is empty." << std::endl;
    } else {
        for (size_t i = 0; i < tasks.size(); ++i) {
            std::cout << i + 1 << ". ";
            std::cout << (tasks[i].completed ? "[X] " : "[ ] ");
            std::cout << tasks[i].description << std::endl;
        }
    }
    std::cout << "--------------------" << std::endl;
}
```

### Adding a Task
This function will prompt the user for a description, create a new `Task` object, and add it to our vector.

```cpp
void addTask(std::vector<Task>& tasks) {
    std::cout << "Enter the task description: ";
    std::string description;
    std::cin.ignore(); // Clears the input buffer before getline
    std::getline(std::cin, description);
    
    tasks.push_back({description, false});
    std::cout << "Task added successfully!" << std::endl;
}
```

### Marking a Task as Completed and Deleting a Task
These functions will ask the user for a task number, validate it, and then perform the appropriate action: either set `completed` to `true` or remove the element from the vector using `tasks.erase()`.

```cpp
void markTaskCompleted(std::vector<Task>& tasks) {
    viewTasks(tasks);
    std::cout << "Enter the number of the task to mark as completed: ";
    int taskNumber;
    std::cin >> taskNumber;

    if (taskNumber > 0 && taskNumber <= tasks.size()) {
        tasks[taskNumber - 1].completed = true;
        std::cout << "Task marked as completed!" << std::endl;
    } else {
        std::cout << "Invalid task number." << std::endl;
    }
}

void deleteTask(std::vector<Task>& tasks) {
    viewTasks(tasks);
    std::cout << "Enter the number of the task to delete: ";
    int taskNumber;
    std::cin >> taskNumber;

    if (taskNumber > 0 && taskNumber <= tasks.size()) {
        tasks.erase(tasks.begin() + taskNumber - 1);
        std::cout << "Task deleted successfully!" << std::endl;
    } else {
        std::cout << "Invalid task number." << std::endl;
    }
}```

## Step 4: Creating the Main Application Loop

The `main` function is where we tie everything together. It will display a menu, take user input, and call the appropriate function in a loop that continues until the user decides to exit.

```cpp
int main() {
    std::vector<Task> tasks;
    const std::string filename = "tasks.txt";
    
    // Load existing tasks from the file at the start
    loadTasksFromFile(tasks, filename);

    int choice = 0;
    while (true) {
        std::cout << "\nMenu:\n";
        std::cout << "1. Add Task\n";
        std::cout << "2. View Tasks\n";
        std::cout << "3. Mark Task as Completed\n";
        std::cout << "4. Delete Task\n";
        std::cout << "5. Save and Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1:
                addTask(tasks);
                break;
            case 2:
                viewTasks(tasks);
                break;
            case 3:
                markTaskCompleted(tasks);
                break;
            case 4:
                deleteTask(tasks);
                break;
            case 5:
                saveTasksToFile(tasks, filename);
                std::cout << "Tasks saved. Goodbye!" << std::endl;
                return 0; // Exit the program
            default:
                std::cout << "Invalid choice. Please try again." << std::endl;
        }
    }

    return 0;
}
```

## The Complete Code

Here is the full source code for the to-do list manager. You can save it as a file named `todo.cpp`.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <fstream>

// Represents a single to-do item
struct Task {
    std::string description;
    bool completed;
};

// Function prototypes
void loadTasksFromFile(std::vector<Task>& tasks, const std::string& filename);
void saveTasksToFile(const std::vector<Task>& tasks, const std::string& filename);
void viewTasks(const std::vector<Task>& tasks);
void addTask(std::vector<Task>& tasks);
void markTaskCompleted(std::vector<Task>& tasks);
void deleteTask(std::vector<Task>& tasks);

int main() {
    std::vector<Task> tasks;
    const std::string filename = "tasks.txt";
    
    loadTasksFromFile(tasks, filename);

    int choice = 0;
    while (true) {
        std::cout << "\nMenu:\n";
        std::cout << "1. Add Task\n";
        std::cout << "2. View Tasks\n";
        std::cout << "3. Mark Task as Completed\n";
        std::cout << "4. Delete Task\n";
        std::cout << "5. Save and Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;

        switch (choice) {
            case 1: addTask(tasks); break;
            case 2: viewTasks(tasks); break;
            case 3: markTaskCompleted(tasks); break;
            case 4: deleteTask(tasks); break;
            case 5:
                saveTasksToFile(tasks, filename);
                std::cout << "Tasks saved. Goodbye!" << std::endl;
                return 0;
            default:
                std::cout << "Invalid choice. Please try again." << std::endl;
        }
    }

    return 0;
}

void loadTasksFromFile(std::vector<Task>& tasks, const std::string& filename) {
    std::ifstream inputFile(filename);
    if (!inputFile.is_open()) return;

    Task tempTask;
    char completedChar;
    while (inputFile >> completedChar && std::getline(inputFile, tempTask.description)) {
        tempTask.completed = (completedChar == '1');
        if (!tempTask.description.empty() && tempTask.description == ' ') {
            tempTask.description = tempTask.description.substr(1);
        }
        tasks.push_back(tempTask);
    }
    inputFile.close();
}

void saveTasksToFile(const std::vector<Task>& tasks, const std::string& filename) {
    std::ofstream outputFile(filename);
    if (!outputFile.is_open()) {
        std::cerr << "Error: Could not open the file for writing." << std::endl;
        return;
    }
    for (const auto& task : tasks) {
        outputFile << task.completed << " " << task.description << std::endl;
    }
    outputFile.close();
}

void viewTasks(const std::vector<Task>& tasks) {
    std::cout << "\n--- To-Do List ---" << std::endl;
    if (tasks.empty()) {
        std::cout << "Your to-do list is empty." << std::endl;
    } else {
        for (size_t i = 0; i < tasks.size(); ++i) {
            std::cout << i + 1 << ". " << (tasks[i].completed ? "[X] " : "[ ] ") << tasks[i].description << std::endl;
        }
    }
    std::cout << "--------------------" << std::endl;
}

void addTask(std::vector<Task>& tasks) {
    std::cout << "Enter the task description: ";
    std::string description;
    std::cin.ignore(); 
    std::getline(std::cin, description);
    tasks.push_back({description, false});
    std::cout << "Task added successfully!" << std::endl;
}

void markTaskCompleted(std::vector<Task>& tasks) {
    viewTasks(tasks);
    std::cout << "Enter the number of the task to mark as completed: ";
    int taskNumber;
    std::cin >> taskNumber;

    if (taskNumber > 0 && taskNumber <= tasks.size()) {
        tasks[taskNumber - 1].completed = true;
        std::cout << "Task marked as completed!" << std::endl;
    } else {
        std::cout << "Invalid task number." << std::endl;
    }
}

void deleteTask(std::vector<Task>& tasks) {
    viewTasks(tasks);
    std::cout << "Enter the number of the task to delete: ";
    int taskNumber;
    std::cin >> taskNumber;

    if (taskNumber > 0 && taskNumber <= tasks.size()) {
        tasks.erase(tasks.begin() + taskNumber - 1);
        std::cout << "Task deleted successfully!" << std::endl;
    } else {
        std::cout << "Invalid task number." << std::endl;
    }
}
```

### How to Compile and Run
1.  Save the code above as `todo.cpp`.
2.  Open your terminal or command prompt.
3.  Navigate to the directory where you saved the file.
4.  Compile the code using g++:
    ```bash
    g++ todo.cpp -o todo_app
    ```
5.  Run the executable:
    ```bash
    ./todo_app
    ```

## Conclusion and Next Steps

Congratulations! You've built a fully functional, console-based to-do list manager in C++. You've practiced using structs, vectors, file I/O, and functions to create a well-organized application.

If you want to challenge yourself further, here are a few ideas for new features:
*   **Edit existing tasks:** Add an option to change the description of a task.
*   **Add due dates:** Modify the `Task` struct to include a due date and display it.
*   **Clear all tasks:** Add a function to wipe the entire list clean.
*   **Improve error handling:** Make the input more robust, for instance, by handling cases where a user enters text instead of a number for a menu choice.

Happy coding!
```
