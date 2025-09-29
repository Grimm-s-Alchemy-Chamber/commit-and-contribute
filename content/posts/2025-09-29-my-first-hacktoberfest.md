---
title: "Guide to Adding a Dark Mode Toggle to a Web Page"
description: "Instructions for implementing a dark mode toggle using HTML, CSS for themes, and JavaScript for switching styles."
tags: ["Beginner", "OpenSource", "Web Development"]
author:
  name: Vansh Nandwani
social:
  github: vansh2408
  linkedin: vansh-nandwani
  twitter: vanshnandwani13
date: 2025-09-29
cover: https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1600&auto=format&fit=crop
---

## Introduction

Dark mode has become an essential feature in modern web applications. It reduces eye strain in low-light environments, saves battery life on devices with OLED screens, and provides users with a personalized browsing experience. In this guide, we'll walk through implementing a dark mode toggle that persists across page reloads.

## What You'll Learn

- How to structure HTML for a theme toggle button
- Creating CSS variables for light and dark themes
- Implementing JavaScript to switch between themes
- Storing user preferences in the browser

## Prerequisites

Before we begin, you should have basic knowledge of:
- HTML structure
- CSS styling
- JavaScript fundamentals

## Step 1: Setting Up the HTML Structure

First, let's create a simple HTML structure with a toggle button for switching themes.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Mode Toggle Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <button id="theme-toggle" aria-label="Toggle dark mode">
            <span class="sun-icon">☀️</span>
            <span class="moon-icon">🌙</span>
        </button>
    </header>
    
    <main>
        <section>
            <h2>About Dark Mode</h2>
            <p>This page demonstrates a simple dark mode implementation. Click the toggle button to switch between light and dark themes!</p>
        </section>
    </main>
    
    <script src="script.js"></script>
</body>
</html>
```

### Key Points

- The toggle button includes both sun and moon icons for visual feedback
- We use `aria-label` for accessibility
- Scripts are loaded at the bottom for better performance

## Step 2: Creating CSS Themes with Variables

CSS custom properties (variables) make it easy to switch between themes. We'll define variables for both light and dark modes.

```css
/* Default theme (light mode) */
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --header-bg: #f8f9fa;
    --button-bg: #e9ecef;
    --button-hover: #dee2e6;
    --transition-speed: 0.3s;
}

/* Dark theme */
[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --header-bg: #2d2d2d;
    --button-bg: #3a3a3a;
    --button-hover: #4a4a4a;
}

/* Apply variables to elements */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color var(--transition-speed), 
                color var(--transition-speed);
    line-height: 1.6;
}

header {
    background-color: var(--header-bg);
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color var(--transition-speed);
}

main {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
}

#theme-toggle {
    background-color: var(--button-bg);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.5rem;
    transition: background-color var(--transition-speed);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

#theme-toggle:hover {
    background-color: var(--button-hover);
}

/* Show/hide icons based on theme */
[data-theme="dark"] .sun-icon {
    display: none;
}

[data-theme="light"] .moon-icon,
:root:not([data-theme]) .moon-icon {
    display: none;
}

[data-theme="dark"] .moon-icon {
    display: inline;
}
```

### CSS Best Practices

- Use CSS variables for easy theme management
- Add smooth transitions for a polished user experience
- Consider using system preferences as the default
- Ensure sufficient color contrast for accessibility

## Step 3: Implementing JavaScript for Theme Switching

Now let's add the JavaScript functionality to toggle themes and save user preferences.

```javascript
// Get the toggle button
const themeToggle = document.getElementById('theme-toggle');

// Get the current theme from localStorage or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// Set the initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Function to toggle theme
function toggleTheme() {
    // Get the current theme
    const theme = document.documentElement.getAttribute('data-theme');
    
    // Switch to the opposite theme
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Update the data-theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save the preference to localStorage
    localStorage.setItem('theme', newTheme);
}

// Add click event listener to toggle button
themeToggle.addEventListener('click', toggleTheme);

// Optional: Respect user's system preference on first visit
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', systemTheme);
    localStorage.setItem('theme', systemTheme);
}
```

### JavaScript Functionality Breakdown

1. **Check localStorage**: We first check if the user has a saved theme preference
2. **Set Initial Theme**: Apply the saved theme or default to light mode
3. **Toggle Function**: Switch between themes and save the preference
4. **System Preference**: Optionally detect and use the user's system theme preference

## Step 4: Preventing Flash of Unstyled Content (FOUC)

To prevent a flash of the wrong theme when the page loads, add this inline script in the `<head>` section:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dark Mode Toggle Demo</title>
    
    <!-- Inline script to prevent FOUC -->
    <script>
        (function() {
            const theme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>
    
    <link rel="stylesheet" href="styles.css">
</head>
```

This script runs immediately before the CSS loads, ensuring the correct theme is applied from the start.

## Advanced Enhancements

### 1. Smooth Icon Transitions

Add CSS animations for the toggle icons:

```css
.sun-icon, .moon-icon {
    transition: transform 0.3s ease;
}

#theme-toggle:hover .sun-icon,
#theme-toggle:hover .moon-icon {
    transform: rotate(20deg);
}
```

### 2. System Preference Listener

Listen for changes in system theme preference:

```javascript
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
});
```

### 3. Accessibility Improvements

Enhance accessibility with proper ARIA attributes:

```javascript
function toggleTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update ARIA label
    themeToggle.setAttribute('aria-label', 
        `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`
    );
}
```

## Testing Your Implementation

Before deploying, test the following:

1. **Theme Toggle**: Click the button to ensure themes switch properly
2. **Persistence**: Reload the page and verify the theme persists
3. **No FOUC**: Check that there's no flash of wrong theme on load
4. **Browser Compatibility**: Test across different browsers
5. **Responsive Design**: Verify the toggle works on mobile devices
6. **Keyboard Navigation**: Ensure the toggle is accessible via keyboard

## Common Pitfalls to Avoid

- **Not preventing FOUC**: Always set the theme before CSS loads
- **Forgetting localStorage**: Save preferences so they persist
- **Poor contrast**: Test color combinations for readability
- **Missing transitions**: Add smooth transitions for better UX
- **Ignoring accessibility**: Include proper ARIA labels and keyboard support

## Conclusion

You've now implemented a fully functional dark mode toggle! This feature enhances user experience by giving visitors control over their viewing preferences. The implementation uses modern web standards and follows best practices for accessibility and performance.

## Next Steps

- Experiment with different color schemes
- Add more theme options (e.g., auto, light, dark, high contrast)
- Implement theme switching with CSS frameworks
- Explore advanced transitions and animations

## Resources

- [MDN Web Docs: CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Web.dev: prefers-color-scheme](https://web.dev/prefers-color-scheme/)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

Happy coding! If you found this guide helpful, feel free to share it with others learning web development.

---

*Have questions or suggestions? Feel free to open an issue or contribute to this post on GitHub!*