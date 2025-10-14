---

title: "Guide to Building a Simple Address Book System in C++"
description: "Walkthrough on designing a contact management system with classes, STL map for data storage, and methods for adding, viewing, and deleting contacts."
tags: ["Beginner", "OpenSource", "C++"]
date: "2025-10-07"
cover: "https://cacm.acm.org/wp-content/uploads/2025/01/012225.BLOG_.21st-Century-C-G.jpg" 
author:
  name: "Sachin Patel"
social:
  "github": "mugenkyou"
---

# Guide to Building a Simple Address Book System in C++

If you're just starting with C++ and want a small, practical project, building an **Address Book System** is a great choice. This tutorial walks you through designing a contact management system using **classes**, **STL map** for data storage, and methods for **adding, viewing, and deleting contacts**.

## Why an Address Book System?

A contact management system helps you practice:

* Object-oriented programming with **classes and objects**
* Using the **STL map** for key-value storage
* Basic input/output operations
* Organizing code with functions and methods

## Step 1: Define the Contact Class

We start by creating a `Contact` class to hold contact details like name, phone number, and email.

```cpp
#include <iostream>
#include <string>

class Contact {
public:
    std::string name;
    std::string phone;
    std::string email;

    Contact() {}
    Contact(std::string n, std::string p, std::string e) : name(n), phone(p), email(e) {}

    void display() {
        std::cout << "Name: " << name << std::endl;
        std::cout << "Phone: " << phone << std::endl;
        std::cout << "Email: " << email << std::endl;
    }
};
```

> This class has a constructor and a `display()` method to show contact details.

## Step 2: Create the Address Book Using `map`

We will use **STL map** to store contacts with the name as the key.

```cpp
#include <map>

class AddressBook {
private:
    std::map<std::string, Contact> contacts;

public:
    void addContact(const Contact& contact) {
        contacts[contact.name] = contact;
        std::cout << "Contact added successfully!\n";
    }

    void viewContact(const std::string& name) {
        if (contacts.find(name) != contacts.end()) {
            contacts[name].display();
        } else {
            std::cout << "Contact not found.\n";
        }
    }

    void deleteContact(const std::string& name) {
        if (contacts.erase(name)) {
            std::cout << "Contact deleted successfully!\n";
        } else {
            std::cout << "Contact not found.\n";
        }
    }

    void viewAllContacts() {
        for (auto &pair : contacts) {
            pair.second.display();
            std::cout << "-------------------\n";
        }
    }
};
```

> The `map` allows fast lookup, insertion, and deletion using the contact's name.

## Step 3: Create a Simple Menu Interface

Let's create a simple menu to interact with the address book.

```cpp
int main() {
    AddressBook book;
    int choice;

    do {
        std::cout << "\n--- Address Book Menu ---\n";
        std::cout << "1. Add Contact\n";
        std::cout << "2. View Contact\n";
        std::cout << "3. Delete Contact\n";
        std::cout << "4. View All Contacts\n";
        std::cout << "5. Exit\n";
        std::cout << "Enter your choice: ";
        std::cin >> choice;
        std::cin.ignore(); // Ignore newline

        if(choice == 1) {
            std::string name, phone, email;
            std::cout << "Enter Name: "; std::getline(std::cin, name);
            std::cout << "Enter Phone: "; std::getline(std::cin, phone);
            std::cout << "Enter Email: "; std::getline(std::cin, email);
            book.addContact(Contact(name, phone, email));
        } else if(choice == 2) {
            std::string name;
            std::cout << "Enter Name to View: "; std::getline(std::cin, name);
            book.viewContact(name);
        } else if(choice == 3) {
            std::string name;
            std::cout << "Enter Name to Delete: "; std::getline(std::cin, name);
            book.deleteContact(name);
        } else if(choice == 4) {
            book.viewAllContacts();
        }
    } while(choice != 5);

    return 0;
}
```

> This menu lets the user add, view, delete, and list all contacts.

## Step 4: Test Your Address Book

Run the program, add a few contacts, view them, delete one, and try to view all again. You should see the changes reflected correctly.

> Example:
>
> ```
> --- Address Book Menu ---
> 1. Add Contact
> 2. View Contact
> 3. Delete Contact
> 4. View All Contacts
> 5. Exit
> Enter your choice: 1
> Enter Name: Alice
> Enter Phone: 1234567890
> Enter Email: alice@example.com
> Contact added successfully!
> ```

## Conclusion

You now have a **working address book system in C++**. This project helps you understand:

* Classes and object-oriented programming
* STL containers like `map`
* Menu-driven user interfaces

You can further improve this project by:

* Adding file storage for persistence
* Sorting contacts by name or phone
* Adding search by phone or email

This project is perfect for beginners looking to practice **C++ fundamentals** while creating a functional program.

---
