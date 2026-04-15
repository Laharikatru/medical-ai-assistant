# 🧠 AI Medical Research Assistant (MVP)

## 📌 Overview

This project is a full-stack AI-powered Medical Research Assistant built using the MERN stack.

The system allows users to input a disease and query, retrieves relevant research data, and presents structured insights combining publications and clinical trials.

---

## 🚀 Features

- Context-aware query handling
- Query expansion (disease + intent)
- Research retrieval from:
  - OpenAlex (Publications)
  - ClinicalTrials.gov (Clinical Trials)
- Structured response generation
- Basic LLM-like reasoning layer (simulated)
- Full-stack implementation (React + Node.js)

---

## 🏗️ Architecture

Frontend:
- React (UI for input and display)

Backend:
- Node.js + Express
- Acts as middleware layer
- Handles:
  - Query processing
  - API integration
  - Response structuring

---

## 🔄 System Pipeline

1. User provides input (disease + query)
2. Query expansion is applied
3. Data is retrieved from:
   - OpenAlex API
   - ClinicalTrials API
4. Data is processed and structured
5. A reasoning layer generates summary output
6. Results displayed on UI

---

## 🧠 LLM & Context Awareness

- Basic context retention implemented (previous disease reused)
- Simulated LLM reasoning layer combines retrieved data
- Designed to integrate with open-source LLMs (LLaMA / Mistral via Ollama)

---

## ⚙️ Tech Stack

- Frontend: React
- Backend: Node.js, Express
- APIs:
  - OpenAlex
  - ClinicalTrials.gov
- HTTP Client: Axios

---

## 📦 Installation & Setup

### Backend

```bash
cd backend
npm install
node server.js
