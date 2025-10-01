---
title: "Guide to Creating a Simple Contact Form"
description: "Tutorial on designing a contact form with HTML for fields and CSS for styling, including basic JavaScript for form validation"
tags: ["Hacktoberfest", "Beginner", "WebDev", "HTML", "CSS", "JavaScript"]
date: "2025-10-01"
author:
  name: "Priyanshi"
social:
  "github": "Priyanshiunique"
---


# Guide to Creating a Simple Contact Form

Creating a contact form is an essential skill for any web developer. This guide will show you how to build a simple contact form using HTML for the structure, CSS for styling, and JavaScript for basic validation.

### HTML Structure

Start by creating the form markup with fields for Name, Email, and Message :-)

```
<form id="contactForm" action="#" method="POST">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required placeholder="Enter your name" />

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required placeholder="Enter your email" />

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="5" required placeholder="Write your message"></textarea>

  <button type="submit">Send</button>
</form>

```

### CSS Styling

Add some CSS to style the form and inputs for a clean and modern look:-)

```
form {
  max-width: 400px;
  margin: 20px auto;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

label {
  display: block;
  margin-top: 10px;
  font-weight: bold;
}

input, textarea {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #bbb;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  margin-top: 12px;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

```

### JavaScript for Basic Validation

Add basic validation to ensure the user fills all fields with appropriate values:-)

```
document.getElementById('contactForm').addEventListener('submit', function(event) {
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name) {
    alert('Please enter your name.');
    event.preventDefault();
    return;
  }

  if (!email || !emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    event.preventDefault();
    return;
  }

  if (!message) {
    alert('Please enter your message.');
    event.preventDefault();
    return;
  }
});

```

## Conclusion

With these simple steps, you have a functional contact form that looks good and validates user input for common errors. You can further enhance this form by adding server-side handling, spam protection, and advanced UI features.


