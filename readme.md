# 💼 Candidate Engagement Chatbot

A full-stack chatbot application that helps engage job candidates by simulating recruitment conversations and summarizing candidate details based on their responses.

---

## 🛠️ Project Setup

### 🔹 Frontend (React + TypeScript)

- Built using **Vite** for fast development.
- Features a clean chat interface (user input + bot responses).
- Maintains **conversation state** on the client side (UI only).
- Displays a **Candidate Summary** at the end of the chat.

### 🔹 Backend (Node.js + TypeScript + Express)

- Built with **Express** and TypeScript.
- Exposes a single API endpoint:


- Accepts: user input + conversation history.
- Returns: bot-generated response + extracted candidate info.

---

## 🧠 Backend Core Logic

### ✅ Conversation State Management

- Stores **conversation history per session** (in-memory or using a session ID).
- Tracks candidate-provided info like:
- Skills
- Experience
- Technologies
- Preferences

### 📋 Job Description

- Uses a **hardcoded job profile**, e.g.:

### 🤖 LLM Integration (Hugging Face)

- Uses a **free Hugging Face model** for generating responses and extracting candidate information.

---

## ⚙️ Local Development Setup

### 🔸 Backend

1. Create a `.env` file in the `backend/` folder with the following content:

  ```env
  HF_API_KEY=hf-xxxxx
  HF_API_URL=https://api-inference.huggingface.co/models/your-model-name
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Run the backend server:

  ```bash
  npm run dev
  ```

---

### 🔸 Frontend

1. Navigate to the `frontend/` folder.

2. Install dependencies:

  ```bash
  npm install
  ```

3. Start the Vite development server:

  ```bash
  npm run dev
  ```

---

## ✅ To Do

- [ ] Add real-time typing indicator
- [ ] Store candidate summaries to backend DB (optional)
- [ ] Support multiple job profiles


testing image: 

![Uploading image.png…]()
