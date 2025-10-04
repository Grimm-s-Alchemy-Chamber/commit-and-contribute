---
title: "Python Variables and Data Types"
description: "Explore basic data types (int, float, string, list) with declaration examples."
tags: ["Beginner", "OpenSource", "Python"]
author:
  name: "hakimlutfi46"
date: "2025-10-04"
cover: "https://i.imgur.com/IRjXISq.jpeg"
social:
  github: "hakimlutfi46"
  "linkedin": "https://www.linkedin.com/in/hakimlutfi"
---

# Python Variables and Data Types

In Python, a **variable** is a container for storing data values. Each value has a specific **data type**, which determines what kind of operations you can perform on it.

Before we dive into the details, here's a quick summary of the basic data types we'll cover:

| Data Type | Description                           | Example Syntax                |
| :-------- | :------------------------------------ | :---------------------------- |
| `int`     | Whole numbers, without decimals.      | `age = 25`                    |
| `float`   | Numbers with a decimal point.         | `price = 199.99`              |
| `str`     | A sequence of characters (text).      | `name = "Hakim"`              |
| `list`    | An ordered and changeable collection. | `items = ["apple", 10, True]` |

Now, let's explore each one with practical examples.

---

## 1. Integer (`int`)

An **integer** is a data type for whole numbers, both positive and negative, without any decimal components. They are used for counting things, like age or the number of items.

**Practice:**

```python
# Storing age in an integer variable
age = 25

# Storing the quantity of stock
stock_quantity = 150

print(f"I am {age} years old.")
print(f"Remaining stock: {stock_quantity} items.")
# Output:
# I am 25 years old.
# Remaining stock: 150 items.
```

---

## 2\. Float (`float`)

A **float** (floating-point number) is a data type for numbers that have a decimal component. They are perfect for representing values that require precision, like prices, measurements, or scientific data.

**Practice:**

```python
# Storing a product price
price = 199.99

# Storing height in meters
height = 1.75

print(f"The price of this item is ${price}.")
print(f"My height is {height} meters.")
# Output:
# The price of this item is $199.99.
# My height is 1.75 meters.
```

---

## 3\. String (`str`)

A **string** is a data type for storing text or a sequence of characters. In Python, a string must be enclosed in either single quotes (`'...'`) or double quotes (`"..."`).

**Practice:**

```python
# Storing a name using double quotes
first_name = "Hakim"

# Storing a city name using single quotes
city = 'Jakarta'

# Concatenating strings to create a greeting
greeting = "Hello, " + first_name + "!"

print(greeting)
print(f"I live in the city of {city}.")
# Output:
# Hello, Hakim!
# I live in the city of Jakarta.
```

---

## 4\. List (`list`)

A **list** is a data type used to store a collection of items in a single variable. Lists are **ordered** (items have a defined order) and **mutable** (you can change, add, and remove items). A list is defined using square brackets `[]`.

**Practice:**

```python
# A list containing fruit names (all strings)
fruits = ["apple", "banana", "mango"]

# A list with mixed data types
student_data = [101, "Budi", 95.5]

# Accessing an item in the list (index starts at 0)
first_fruit = fruits[0] # Gets "apple"

print(f"The first fruit in the list is {first_fruit}.")
print(f"Student data: {student_data}")
# Output:
# The first fruit in the list is apple.
# Student data: [101, 'Budi', 95.5]
```

By understanding and practicing with these four basic data types, you have a strong foundation to start building more complex programs with Python. Happy coding\! ✨
