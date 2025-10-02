---
title: "Dictionaries in Python for Beginners"
description: "Learn to create and use dictionaries with a detailed phonebook example, practical tips, and advanced techniques."
tags: ["Beginner", "OpenSource", "Python"]
author: "Dwid4r"
date: "2025-10-01"
social:
  github: "https://github.com/yourusername"
  twitter: "https://twitter.com/yourusername"
---

# 📚 Dictionaries in Python for Beginners

Dictionaries in Python are one of the most **powerful and versatile data structures**. They allow you to store and organize data using **key-value pairs**, making it easy to look up and manipulate information efficiently.

---

## 🔑 What is a Dictionary?

A dictionary is a collection of items where each item has a **key** and a **value**.  
Think of it like a real phonebook — the person’s **name** is the key, and their **phone number** is the value.

Unlike lists, which are indexed by numbers, dictionaries are indexed by keys, which can be strings, numbers, or even tuples.

---

## 📖 Example: Simple Phonebook

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


# Using get() to avoid errors if key doesn't exist
print(phonebook.get("David", "Not found"))  # Output: Not found

# Using try/except
try:
    print(phonebook["David"])
except KeyError:
    print("Key not found!")


# Loop through keys and values
for name, number in phonebook.items():
    print(f"{name}: {number}")

# Loop through keys only
for name in phonebook.keys():
    print(name)

# Loop through values only
for number in phonebook.values():
    print(number)
# if statement 
if "Alice" in phonebook:
    print("Alice is in the phonebook")
    
    
# Dictionary Comprehensions 
names = ["Alice", "Bob", "Charlie"]
phonebook = {name: f"000-{i+1000}" for i, name in enumerate(names)}
print(phonebook)

# Filtering example
numbers = [100, 200, 300, 400]
squared_dict = {num: num**2 for num in numbers if num > 200}
print(squared_dict)  # Output: {300: 900, 400: 160000}


# Merging dictionaries
phonebook.update({"David": "777-8888", "Eve": "999-0000"})

# Removing items safely
removed = phonebook.pop("Alice", "Not found")
print(removed)

# Getting all keys or values
keys = list(phonebook.keys())
values = list(phonebook.values())

# Sorting a dictionary by key
sorted_phonebook = dict(sorted(phonebook.items()))
print(sorted_phonebook)

# Nested dictionaries
users = {
    "Alice": {"age": 25, "email": "alice@example.com"},
    "Bob": {"age": 30, "email": "bob@example.com"}
}
print(users["Alice"]["email"])  # Output: alice@example.com

