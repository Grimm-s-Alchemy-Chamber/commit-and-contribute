# 🤝 Contributing to Commit & Contribute

Thank you for your interest in contributing to **Commit & Contribute** — a community-driven blog built for **Hacktoberfest 2025**! 🎉  
This project is designed so **anyone** can contribute — whether you’re a seasoned developer or writing your very first open-source post.

No coding experience? No problem! All contributions are made by adding simple **Markdown** (`.md`) and **JSON** (`.json`) files via GitHub Pull Requests.

---

## 📌 Table of Contents
- [Project Scope](#-project-scope)
- [Before You Begin](#-before-you-begin)
- [Repository Structure](#-repository-structure)
- [How to Contribute](#-how-to-contribute)
  - [Option 1: Write a Blog Post](#option-1-write-a-blog-post)
  - [Option 2: Add Your Author Profile](#option-2-add-your-author-profile)
- [Contribution Workflow](#-contribution-workflow)
- [Validation & Quality Checks](#-validation--quality-checks)
- [Community Guidelines](#-community-guidelines)
- [Example Files](#-example-files)
- [Need Help?](#-need-help)

---

## 🎯 Project Scope

This is a **zero-CMS, file-based blog** built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
All content lives in the `/content` directory:
- **Posts** → Markdown files with frontmatter
- **Authors** → JSON profile files

The goal is to:
- Celebrate open source during **Hacktoberfest**
- Lower the barrier to first-time contributions
- Share knowledge through tutorials, reflections, and stories

---

## 🛠️ Before You Begin

You’ll need:
- A **GitHub account**
- Basic understanding of **forking**, **cloning**, and **Pull Requests**
- Familiarity with **Markdown** (for posts) and **JSON** (for profiles) — both are beginner-friendly!

> 💡 **Tip**: Use the GitHub web editor if you don’t want to set up the project locally.

---

## 🗂️ Repository Structure

```
/content
  ├── posts/        ← Your blog posts go here (.md files)
  └── authors/      ← Your author profile goes here (.json files)
```

That’s it! You only need to touch these two folders.

---

## ✍️ How to Contribute

### Option 1: Write a Blog Post

1. **File location**: `content/posts/`
2. **Filename format**: `YYYY-MM-DD-your-title.md`  
   Example: `2025-10-05-my-first-hacktoberfest.md`
3. **Required frontmatter** (at the top of your file):

```yaml
---
title: "Your Post Title"
description: "A short 1–2 sentence summary"
tags: ["Hacktoberfest", "Beginner", "WebDev"]
author:
  name: "Your Full Name"
date: "2025-10-05"
cover: "https://example.com/image.jpg"  # Optional
social:
  github: "your-github-username"        # Optional but recommended
  twitter: "your-twitter-handle"
  linkedin: "your-linkedin-id"
---

```

4. **Write your content** below the frontmatter using **Markdown**:
   - Use headings (`##`, `###`)
   - Add code blocks with triple backticks
   - Include links, lists, and images as needed

#### Adding Images to Your Post

You can add images in two ways: as a cover image or within your content.

1.  **Cover Image (Frontmatter)**
    - Use the `cover` field in the frontmatter.
    - You can use a full URL to a remote image or a path to a local image.
    - Example (Remote): `cover: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"`
    - Example (Local): `cover: "/images/my-cover-image.png"`

2.  **Content Images (Markdown)**
    - Use standard Markdown syntax: `!Alt Text`.
    - **Local Images**: Place your image files in the `/public/images/` directory. Then, reference them with a root-relative path:
      ```markdown
      ![My Awesome Diagram](/images/my-diagram.png)
      ```
    - **Remote Images**: You can use a full URL to an image from any website. The project is configured to support images from all domains.
      ```markdown
      ![A photo from Unsplash](https://images.unsplash.com/photo-1544005313-94ddf0286df2)
      ```

> ✅ **Post ideas**: Tutorials, reflections, “lessons learned,” open-source tips, beginner guides.

---

### Option 2: Add Your Author Profile

1. **File location**: `content/authors/`
2. **Filename**: `your-github-username.json`  
   Example: `janedoe.json`
3. **File format**:

```json
{
  "name": "Jane Doe",
  "bio": "Beginner in open source, passionate about no-code tools and community learning.",
  "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800",
  "social": {
    "github": "janedoe",
    "twitter": "janedoe",
    "linkedin": "janedoe",
    "website": "https://janedoe.dev"
  }
}
```

> 🔹 **Notes**:
> - `avatar` is optional — if omitted, we’ll try to use your GitHub avatar
> - Only include social fields you’re comfortable sharing

---

## 🔄 Contribution Workflow

1. **Fork** this repository (click the "Fork" button on GitHub)
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Commit-and-Contribute.git
   cd Commit-and-Contribute
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b add/my-first-post
   ```
4. **Add your files**:
   - `content/posts/2025-10-XX-your-post.md`
   - `content/authors/your-github-username.json`
5. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add blog post: My First Open Source Contribution"
   ```
6. **Push to your fork**:
   ```bash
   git push origin add/my-first-post
   ```
7. **Open a Pull Request** on GitHub  
   → We’ll review it and help you if anything needs fixing!

---

## ✅ Validation & Quality Checks

When you open a PR, our automated checks will verify:
- Your post includes all required frontmatter fields
- Your JSON profile is valid (no syntax errors)
- Filename conventions are followed

If checks fail, read the error message and update your files accordingly.

> ⚠️ **Common issues**:
> - Missing `title`, `author.name`, or `date`
> - Invalid JSON (e.g., trailing commas)
> - Using `.txt` or `.html` instead of `.md`

---

## 🌍 Community Guidelines

This blog is a space for **developers, learners, and open-source contributors** to share knowledge, experiences, and insights about **programming, software engineering, and technology**. To keep it valuable and inclusive, please follow these guidelines:

### ✅ Do:
- **Share original insights** — tutorials, debugging stories, project walkthroughs, or lessons learned.
- **Explain concepts clearly**, especially for beginners.
- **Credit sources** if you reference code, libraries, or ideas that aren’t your own.
- **Be respectful and constructive** in tone — we’re all learning.
- **Focus on real-world value**: practical tips, working code snippets, or thoughtful reflections on tech practices.

### ❌ Don’t:
- Submit **purely AI-generated content** without personal insight, editing, or context.
- Post **promotional content**  unless it’s directly relevant to a shared learning experience.
- Include **offensive, discriminatory, or off-topic material** (this is a tech blog — let’s keep it on subject).
- **Duplicate existing posts** without adding new perspective, updates, or depth.
- Use the blog for **link farming**, SEO spam, or placeholder content.

We reserve the right to **reject or request edits** on submissions that don’t align with this project’s educational and community-driven mission.

Let’s build a blog that helps developers **learn, grow, and contribute** — one thoughtful post at a time. 💻✨

## ❓ Need Help?

- Open an **Issue** with the label `question` or `help wanted`
- Mention `@maintainers` in your PR description
- Join the conversation in the **Discussions** tab

We’re here to help you succeed — your contribution matters! 💙

---

**Happy contributing, and welcome to the community!** 🐝  
Let’s make Hacktoberfest 2025 the most inclusive one yet.