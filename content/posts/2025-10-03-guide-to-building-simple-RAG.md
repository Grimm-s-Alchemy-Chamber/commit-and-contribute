---
title: "Build Your First RAG System with Gemini API"
description: "Learn how to build a simple Retrieval-Augmented Generation (RAG) system."
tags: ["Hacktoberfest", "Beginner", "AI", "RAG"]
date: "2025-10-03"
cover: "https://i.ytimg.com/vi/gW4Q-UiJZVY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBf2Y1r490lyYNWoBVz6ejdP0qH2w" # Optional
author:
  name: "darkbits018"
social:
  "github": "darkbits018"
  "linkedin": "abhaygp"
---

### 🤔 What Even Is RAG?

Imagine you have a super-smart AI assistant but instead of guessing answers from memory, it **reads your notes first**, then answers based on **your facts**. That’s **RAG**: **Retrieval-Augmented Generation**.

- **Retrieval**: Find relevant info from *your* documents  
- **Augmentation**: Give that info to the AI  
- **Generation**: Let the AI write a smart, grounded answer

Today, you’ll build a tiny RAG system using **Google’s free Gemini API** no servers, no credit card, and under 100 lines of code.

---

### 🛠️ What You’ll Need

1. A **Google account** (to use Gemini)
2. Python installed (v3.8+)
3. 5 minutes of your time 😊

> 💡 **Don’t worry if you’ve never used AI APIs before** we’ll walk through everything!

---

### 🔑 Step 1: Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click **“Get API key”** (top-right)
3. Copy the key (it looks like `AIzaSy...`)
4. Save it somewhere safe (you’ll use it in a minute)

> ✅ **Free tier**: Gemini gives you **60+ requests per minute** for free plenty for learning!

---

### 📁 Step 2: Create Your “Knowledge” File

RAG needs something to read! Let’s make a simple text file.

Create a file called `facts.txt` and paste this:

```txt
Hacktoberfest is a month-long celebration of open source software.
It started in 2014 by DigitalOcean.
To earn a T-shirt, you need 4 valid pull requests in October.
It’s beginner-friendly and encourages new contributors.
```

This is your **private knowledge base** the AI will only use this to answer questions.

---

### 🐍 Step 3: Install Python Tools

Open your terminal and run:

```bash
pip install google-generativeai chromadb sentence-transformers
```

What these do:
- `google-generativeai`: Talks to Gemini
- `chromadb`: Stores document “memories” (a vector database)
- `sentence-transformers`: Turns text into numbers AI can compare

---

### 🧩 Step 4: The Magic Script (`rag.py`)

Create a new file called `rag.py` and paste this:

```python
import os
from google.generativeai import GenerativeModel
import google.generativeai as genai
from chromadb import PersistentClient
from sentence_transformers import SentenceTransformer

# === 1. SET UP GEMINI ===
genai.configure(api_key="YOUR_API_KEY_HERE")  # 👈 PASTE YOUR KEY!
model = GenerativeModel("gemini-1.5-flash")

# === 2. LOAD YOUR FACTS ===
with open("facts.txt", "r") as f:
    facts = f.read().split("\n\n")  # Split into chunks

# === 3. TURN TEXT INTO "MEMORY" (EMBEDDINGS) ===
embedder = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = embedder.encode(facts)

# === 4. SAVE TO VECTOR DATABASE ===
client = PersistentClient(path="./my_rag_db")
collection = client.get_or_create_collection("facts")
collection.add(
    embeddings=embeddings.tolist(),
    documents=facts,
    ids=[f"fact_{i}" for i in range(len(facts))]
)

# === 5. ASK A QUESTION! ===
question = "When did Hacktoberfest start?"
print(f"❓ Question: {question}\n")

# Find the most relevant fact
results = collection.query(
    query_embeddings=embedder.encode([question]).tolist(),
    n_results=1
)
context = results["documents"][0][0]

# Ask Gemini using your fact
prompt = f"Answer using only this context:\n{context}\n\nQuestion: {question}"
response = model.generate_content(prompt)

print(f"🤖 Answer: {response.text}")
```

> 🔑 **Don’t forget**: Replace `"YOUR_API_KEY_HERE"` with your actual Gemini key!

---

### ▶️ Step 5: Run It!

In your terminal, run:

```bash
python rag.py
```

You should see:

```
❓ Question: When did Hacktoberfest start?

🤖 Answer: Hacktoberfest started in 2014.
```

✅ **It worked!** The AI didn’t guess it used **your file** to answer.

---

### 🌟 Why This Is Cool

- **No hallucinations**: Answers come from *your* data
- **Private**: Your `facts.txt` never leaves your computer
- **Scalable**: Add more files, PDFs, or web pages later
- **Free**: Uses free-tier APIs and open-source tools

---

