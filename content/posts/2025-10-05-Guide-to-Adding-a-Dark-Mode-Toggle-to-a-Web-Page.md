---
title: "Guide to Adding a Dark Mode Toggle to a Web Page"
description: "Instructions for implementing a dark mode toggle using HTML, CSS for themes, and JavaScript for switching styles."
tags: ["Beginner", "OpenSource", "Web Development"]
author: "STICKnoLOGIC"
cover: "https://cdn.sticknologic.is-a.dev/picography-moon-craters.jpg"
date: "2025-10-05"
social:
  github: "STICKnoLOGIC"
  bluesky: "STICKnoLOGIC.is-a.dev"
  linkedin: "STICKnoLOGIC"
--- 

## Guide to Adding a Dark Mode Toggle to a Web Page

##### 🧾 TL;DR — Add a Dark Mode Toggle to Your Website
**Goal:** Let users pick between light and dark looks, and remember what they chose.

### Introduction

Dark mode is a popular feature that lets users switch to a darker color scheme — great for reducing eye strain and giving your site a modern feel.

If you're just starting out with web , you may think it's hard to add dark mode. But don't sweat it! We’re going to walk through it, step by step, with just HTML, CSS, and JavaScript. We'll keep each of these in their own files to keep things clean.

You also don't need fancy software — just a basic code editor (Notepad works!) and a web browser.

### 🎯 What You'll Learn

In this guide, you'll get to:
- Make a dark mode button that switches the theme right away.
- Use CSS to set up and change theme colors.
- Pay attention to that the user prefers (light or dark).
- Save what the user picks, so it retains even when they return to your page.
- Make sure your dark mode is simple to use.
- Stop that quick “white flash” when the page loads.

### 🧱 Setting Up Your Files
Make a new folder for your project like dark-mode-tutorial, then put ```index.html```, ```style.css```, and ```script.js``` inside. Like this:
```
dark-mode-tutorial/
│
├── index.html
├── style.css
└── script.js
```
#### 📄 Step 1: index.html
This is your main page. It links to the CSS and JavaScript files.
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Dark Mode Toggle Demo</title>

  <!-- Prevent Flash of Light Theme -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  </script>

  <!-- Link to external CSS -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h1>My Website</h1>
    <button class="theme-toggle" id="themeToggle">🌙 Dark Mode</button>
  </header>

  <main>
    <h2>Welcome!</h2>
    <div class="card">
      <p>This page demonstrates how to add a dark mode toggle using HTML, CSS, and JavaScript. Try clicking the button above to switch themes!</p>
    </div>
  </main>

  <!-- Link to external JavaScript -->
  <script src="script.js"></script>
</body>
</html>
```
**This is how it works:**
- The **\<link>** and **\<script>** tags add the other files for clean separation.
- The **\<script>** in the **\<head>** runs first and sets the theme right away to **avoid that flash**.

#### 🎨 Step 2: style.css
This file is where you set up the design and theme colors.

```css
/* === Default/Light Theme Variables === */
:root {
    --bg: #ffffff;
  --text: #111827;
  --card: #f3f4f6;
  --accent: #2563eb;
}

/* === Dark Theme Variables === */
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f1f5f9;
  --card: #1e293b;
  --accent: #60a5fa;
}

/* === General Styles === */
body {
  font-family: system-ui, sans-serif;
  background: var(--bg);
  color: var(--text);
  margin: 0;
  transition: background 0.3s, color 0.3s;
}

/* === Header === */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--card);
}

/* === Toggle Button === */
.theme-toggle {
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 50px;
  background: var(--accent);
  color: white;
  font-size: 0.9rem;
  transition: opacity 0.2s;
}

.theme-toggle:hover {
  opacity: 0.85;
}

/* === Main Content === */
main {
  padding: 2rem;
  max-width: 700px;
  margin: auto;
}

.card {
  background: var(--card);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}
```
**This is how it works:**
- ```:root``` sets up the colors for the Default/light theme.
- ```[data-theme=dark]``` changes those colors when dark mode is on.
- ```transition``` makes the switch to dark mode smooth. If you want immediate swap, shorten the duration!
- The rest is just styling to make the page look good.

#### ⚙️ Step 3: script.js

This file is where the magic button happens.

```js
// Select the toggle button and <html> element
const toggleBtn = document.getElementById('themeToggle');
const root = document.documentElement;

// Apply the given theme
function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// Detect current theme
let currentTheme = root.getAttribute('data-theme') || 'light';
setTheme(currentTheme);

// When button is clicked
toggleBtn.addEventListener('click', () => {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(currentTheme);
});
```
**This is how it works:**
- ```setTheme()``` changes the ```data-theme``` and saves it.
- It also updates the button to show the current mode.
- When you reload the page, the theme stays the same.

#### 🧪 Step 4: Test Your Dark Mode
1. Open index.html in a .
2. Click the “🌙 Dark Mode” button – the theme should change!
3. Refresh the page — it should remember your setting.
4. If you set your computer to dark mode, the site should match it.

### 🧭 Wrapping Up
You now have a dark mode toggle that works! It wasn't too bad, right?

### ✅ What We Learned
- Keep **HTML, CSS, and JavaScript apart** to keep your code organized.
- Use **CSS variables** to make theme changes easy.
- Always **save what the user picks** so they don't have to keep reselecting it.
- That **little script in** \ stops the page from flashing white when it’s loading.
- Match **what your user has set on their computer** for the best experience.

### 💡 Where to Go Next
- Make the theme switch with a fade.
- Use a toggle switch icon instead of text on the button.
- Add stuff to help those using screen readers.
- Make more themes, like “Sepia” or “High Contrast.
