---
title: "Guide to Developing a Simple Library Management System in Python"
description: "Instructions for creating a book management system with classes and lists, including functions to add, remove, borrow, and search books."
tags: ["Beginner", "OpenSource", "Python"]
author: "Dwidar"
date: "2025-10-03"
social:
  github: "https://github.com/DwiD4r"
---

# Guide to Developing a Simple Library Management System in Python

In this blog post, we will walk through building a simple **Library Management System** in Python.  
The system allows you to manage books, users, and borrowing/returning operations with a menu-driven interface.

---

## 📌 Features
- Add books with ID, name, and quantity
- Add users with name and ID
- Borrow and return books
- Search books by prefix
- Display borrowed books and library status

---

## 🧑‍💻 Implementation

We define three main classes:
1. **Book** → represents a book with its details
2. **User** → represents a library user
3. **LibrarySystem** → handles all operations and menu navigation

### Full Code:
```python
class Book:
    def __init__(self):
        self.id = -1
        self.name = ""
        self.total_quantity = 0
        self.total_borrowed = 0

    def read(self):
        print("Enter id, name, and quantity: ", end="")
        self.id, self.name, self.total_quantity = input().split()
        self.id = int(self.id)
        self.total_quantity = int(self.total_quantity)

    def has_prefix(self, prefix):
        if len(prefix) > len(self.name):
            return False
        for i in range(len(prefix)):
            if prefix[i] != self.name[i]:
                return False
        return True

    def print_book(self):
        print(f"id = {self.id} name = {self.name} total_quantity = {self.total_quantity} "
              f"total_borrowed = {self.total_borrowed}")

    def borrow(self):
        if self.total_quantity - self.total_borrowed == 0:
            return False
        self.total_borrowed += 1
        return True

    def return_copy(self):
        if self.total_borrowed <= 0:
            raise Exception("Cannot return book that wasn't borrowed")
        self.total_borrowed -= 1


class User:
    def __init__(self):
        self.id = -1
        self.name = ""
        self.borrowed_books_ids = []

    def read(self):
        print("Enter user name & national id: ", end="")
        self.name, self.id = input().split()
        self.id = int(self.id)

    def is_borrowed(self, book_id):
        return book_id in self.borrowed_books_ids

    def borrow(self, book_id):
        self.borrowed_books_ids.append(book_id)

    def return_copy(self, book_id):
        if book_id in self.borrowed_books_ids:
            self.borrowed_books_ids.remove(book_id)
        else:
            print(f"User {self.name} never borrowed book id {book_id}")

    def print_user(self):
        self.borrowed_books_ids.sort()
        print(f"user {self.name} id {self.id} borrowed books ids: ", end="")
        for book_id in self.borrowed_books_ids:
            print(book_id, end=" ")
        print()


class LibrarySystem:
    def __init__(self):
        self.users = []
        self.books = []

    def find_book_idx_by_name(self, name):
        for i, book in enumerate(self.books):
            if name == book.name:
                return i
        return -1

    def find_user_idx_by_name(self, name):
        for i, user in enumerate(self.users):
            if name == user.name:
                return i
        return -1

    def read_user_name_and_book_name(self):
        trials = 3
        while trials > 0:
            print("Enter user name and book name: ", end="")
            user_name, book_name = input().split()

            user_idx = self.find_user_idx_by_name(user_name)
            if user_idx == -1:
                print("Invalid user name. Try again")
                trials -= 1
                continue

            book_idx = self.find_book_idx_by_name(book_name)
            if book_idx == -1:
                print("Invalid book name. Try again")
                trials -= 1
                continue

            return user_idx, book_idx

        print("You did several trials! Try later.")
        return -1, -1

    def add_book(self):
        book = Book()
        book.read()
        self.books.append(book)
        print(f"Book '{book.name}' added successfully!")

    def search_book_by_prefix(self):
        print("Enter book name prefix: ", end="")
        prefix = input()

        cnt = 0
        for book in self.books:
            if book.has_prefix(prefix):
                print(book.name)
                cnt += 1

        if cnt == 0:
            print("No books with such prefix")

    def print_who_borrowed_book_by_name(self):
        print("Enter book name: ", end="")
        book_name = input()

        book_idx = self.find_book_idx_by_name(book_name)
        if book_idx == -1:
            print("Invalid book name.")
            return

        book_id = self.books[book_idx].id

        if self.books[book_idx].total_borrowed == 0:
            print("No borrowed copies")
            return

        found = False
        for user in self.users:
            if user.is_borrowed(book_id):
                print(user.name)
                found = True

        if not found:
            print("No users borrowed this book")

    def print_library_by_id(self):
        sorted_books = sorted(self.books, key=lambda x: x.id)
        print()
        for book in sorted_books:
            book.print_book()

    def print_library_by_name(self):
        sorted_books = sorted(self.books, key=lambda x: x.name)
        print()
        for book in sorted_books:
            book.print_book()

    def add_user(self):
        user = User()
        user.read()
        self.users.append(user)
        print(f"User '{user.name}' added successfully!")

    def user_borrow_book(self):
        user_idx, book_idx = self.read_user_name_and_book_name()
        if user_idx == -1 or book_idx == -1:
            return

        user_id = self.users[user_idx].id
        book_id = self.books[book_idx].id

        if not self.books[book_idx].borrow():
            print("No more copies available right now")
        else:
            self.users[user_idx].borrow(book_id)
            print(f"Book '{self.books[book_idx].name}' borrowed by '{self.users[user_idx].name}'")

    def user_return_book(self):
        user_idx, book_idx = self.read_user_name_and_book_name()
        if user_idx == -1 or book_idx == -1:
            return

        book_id = self.books[book_idx].id
        self.books[book_idx].return_copy()
        self.users[user_idx].return_copy(book_id)
        print(f"Book '{self.books[book_idx].name}' returned by '{self.users[user_idx].name}'")

    def print_users(self):
        print()
        for user in self.users:
            user.print_user()

    def library_menu(self):
        while True:
            print("\n" + "=" * 50)
            print("Library Menu:")
            print("1) Add book")
            print("2) Search books by prefix")
            print("3) Print who borrowed a book")
            print("4) Print library by ID")
            print("5) Print library by name")
            print("6) Add user")
            print("7) User borrow book")
            print("8) User return book")
            print("9) Print users")
            print("10) Exit")
            print("Enter your choice [1-10]: ", end="")

            try:
                choice = int(input())
            except ValueError:
                print("Please enter a valid number!")
                continue

            if choice == 1:
                self.add_book()
            elif choice == 2:
                self.search_book_by_prefix()
            elif choice == 3:
                self.print_who_borrowed_book_by_name()
            elif choice == 4:
                self.print_library_by_id()
            elif choice == 5:
                self.print_library_by_name()
            elif choice == 6:
                self.add_user()
            elif choice == 7:
                self.user_borrow_book()
            elif choice == 8:
                self.user_return_book()
            elif choice == 9:
                self.print_users()
            elif choice == 10:
                print("Thank you for using the Library Management System!")
                break
            else:
                print("Invalid choice! Please enter a number between 1-10.")


def main():
    library = LibrarySystem()
    library.library_menu()


if __name__ == "__main__":
    main()
