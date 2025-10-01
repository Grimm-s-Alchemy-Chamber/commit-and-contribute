---
title: "Dictionaries in Python for Beginners"
description: "Learn to create and use dictionaries with a simple phonebook example."
tags: ["Beginner", "OpenSource", "Python"]
author: "your-github-username"
date: "2025-10-01"
social:
  github: "https://github.com/yourusername"
  twitter: "https://twitter.com/yourusername"
---

Dictionaries in Python are a powerful way to store and organize data using key-value pairs.

### 🔑 What is a Dictionary?
A dictionary is a collection of items where each item has a **key** and a **value**.  
Think of it like a real phonebook — the person’s name is the key, and their phone number is the value.

### 📖 Example: Phonebook
```python
# Creating a dictionary
phonebook = {
    "Alice": "123-4567",
    "Bob": "987-6543"
}

# Accessing values
print(phonebook["Alice"])  # Output: 123-4567

# Adding a new entry
phonebook["Charlie"] = "555-1234"

# Updating a value
phonebook["Alice"] = "111-2222"

# Deleting an entry
del phonebook["Bob"]

print(phonebook)
