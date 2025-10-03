---
title: "Web Scraping with Cheerio in Node.js"
description: "A beginners guide to the world of webscrapping"
tags: ["Nodejs", "Beginner", "WebDev", "OpenSource"]
author:
  name: "Jayant Navrange"
date: "2025-10-04"
cover: "https://iili.io/KW5sbQS.md.png" # Optional
social:
  github: "jayantur13" # Optional but recommended
  linkedin: "jayant-navrange-238aa5138"
---

# Web Scraping with Cheerio in Node.js — A Beginner’s Friendly Guide

> Requirements: Knowledge of nodejs,css and axios

Have you ever found yourself scrolling through a website, thinking:  
_"How can I get all these data ? Well, there are a few ways, one of which is called **web scrapping**"_

Yeah, I’ve been there too. In my case I was trying to collect product details, track news headlines and there's more case you will discover. That's where I find out that I can **automate data collection from the web** using a little knowledge of programming.

And honestly? The first time I tried and it didn't work, I felt kind of sad, but then I tried and tried and finally got the data, it was pure magic ✨

Now, lets dive into this tutorial, where I will try to keep things as easy as possible, so you grab the concept and learn something new and useful.

---

## 🧐 What is Web Scraping?

In simple words:  
Web scraping is the art of using code to **extract information from websites**. Instead of manually copying stuff, your program does the weight lifting.

- Imagine you want all blog post titles from a news site.
- Or some kind of tabular data.
- Or maybe jokes from a jokes site (😅).

That’s where **web scraping** shines.

---

## ⚡ Why Cheerio?

Node.js has many tools for scraping, but **Cheerio** is the most popular I have heard of. It:

- Lets you parse HTML easily.
- Feels like **jQuery** (if you’ve used `$` selectors before, you’ll feel at ease).
- Is lightweight and fast.

Cheerio doesn’t make requests itself (it just parses HTML), so we usually pair it with something like `axios` (A promise based HTTP client for the browser and node.js) to fetch pages.

---

## 🚀 Let’s Build Our First Scraper

Alright, let’s scrape some headlines!

### Step 1: Setup Project

```bash
mkdir cheerio-scraper
cd cheerio-scraper
npm init -y
npm install axios cheerio
```

> Open the project folder `cheerio-scraper` in a IDE like VSCode

### Step 2: Create an index.js or server.js file (entry point)

```java
const axios = require("axios");
const cheerio = require("cheerio");

const URL = "https://quotes.toscrape.com"; // replace with your target site

async function scrapeSite() {
  try {
    const res = await axios.get(URL);
    const html = res.data;
    //Get html and load it in cheerio
    const $ = cheerio.load(html);

    const quotes = [];

    //Select div then select class with dot (.quote)
    //To list all quote and author use each without arrow function, 'this' will work
    $("div.quote").each(function () {
      const text = $(this).find(".text").first().text();
      const author = $(this).find(".author").first().text();
      quotes.push({
        quote: text,
        author: author,
      });
    });
    console.log(quotes);
  } catch (error) {
    console.error("Error scraping site:", error.message);
  }
}

scrapeSite();

```

### Step 2: Update package.json

```java
{
  "name": "cheerio-scraper",
  "version": "1.0.0",
  "description": "",
  "main": "index.js", //Can be server.js
  "scripts": {
    "start": "node index.js"//This will run script
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "axios": "^1.12.2",
    "cheerio": "^1.1.2"
  }
}
```

> Here, we changed one or two things

### Step 2: Now, run the script in terminal

`npm start`

> Starts the script, performs scrapping in index.js

### Result/Output you'll get

```java
[
  {
    quote: '“The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.”',
    author: 'Albert Einstein'
  },
  {
    quote: "“I have not failed. I've just found 10,000 ways that won't work.”",
    author: 'Thomas A. Edison'
  },
  {
    quote: "“A woman is like a tea bag; you never know how strong it is until it's in hot water.”",
    author: 'Eleanor Roosevelt'
  },
  {
    quote: '“A day without sunshine is like, you know, night.”',
    author: 'Steve Martin'
  }
]
```

### 🛠️ How Cheerio Selectors Work

If you know CSS selectors, you already know Cheerio.

- $("h2") - selects all h2 elements
- $(".title") - selects elements with class title.
- $("#main") - selects element with id main.
- $("a[href]") - selects all links.

> You can combine them just like CSS.
>
> > Learn more at [Cheerio website](https://cheeriojs.org)

### 🤔 Wondering If Web Scraping is Legal?

Web scraping lives in a gray zone.

- Scraping publicly available data is generally fine (as long as you don’t overload servers).
- Avoid scraping login-protected or sensitive content.
- Always check a website’s robots.txt and terms of service.

Golden rule:
👉 Scrape responsibly, like a polite guest in someone’s house.

### 🐣 Tips for Beginners

- Start small → scrape titles or links first.
- Use console.log everywhere → debugging is your best friend.
- Play with selectors → open DevTools on a site and experiment.
- Don’t get discouraged → websites can be messy, and that’s normal.

### 🎯 Wrapping Up

Web scraping with Cheerio in Node.js is one of those skills that’s both fun and practical. You’ll:

- Save hours of manual copy-pasting.
- Automate boring tasks.
- Build data-driven projects faster.

And the best part? Once you get comfortable, you’ll start looking at websites differently. You’ll see hidden patterns, structures, and data just waiting to be collected.

So go ahead—pick a site (preferably something simple), and give it a scrape.

Who knows? You might just build your next big project from the data you collect today. 🚀
