# 🚀 AI Career OS — Job Application Command Centre

An AI-powered **career management system** built for the **Gappy AI Hackathon 2026**, designed to help students and job seekers manage applications, improve resumes, and get AI-driven career guidance in one place.

---

## 🧠 Problem Statement

Job seekers struggle to:
- Track multiple job applications across platforms
- Improve resumes based on feedback
- Prepare for interviews
- Get personalized career guidance

This leads to **lost opportunities and poor organization**.

---

## 💡 Solution

AI Career OS is an all-in-one command centre that combines:

- 📋 Job Application Tracking System  
- 🤖 AI Career Coach (Gemini AI)  
- 📄 AI Resume Analyzer  
- 📊 Dashboard Analytics  

---

## ✨ Features

### 📋 Job Tracker
- Add, update, delete job applications
- Track status: Applied / Interview / Shortlisted
- Real-time dashboard updates

### 🤖 AI Career Chat (Gemini)
- Career guidance
- Interview preparation help
- Resume improvement suggestions
- DSA + roadmap support

### 📄 Resume Analyzer
- Upload PDF resume
- AI-powered ATS score
- Strengths & weaknesses detection
- Skill gap analysis

### 📊 Dashboard Analytics
- Total applications
- Interviews count
- Offers tracking

---

## 🧰 Tech Stack

### Infrastructure
- Lemma SDK (agentic workflow support + job data structure + automation ready)

### Frontend
- React (Vite)
- Axios
- Lucide Icons
- Recharts

### Backend
- Node.js
- Express.js
- Multer
- PDF Parse

### AI Layer
- Google Gemini API (@google/genai)

---

## 🏗️ Architecture

Frontend (React)
        ↓
Backend API (Node.js + Express)
        ↓
AI Layer (Google Gemini)
        ↓
Data Layer (In-memory / Lemma SDK)

---

## 🚀 Setup Instructions
1. Clone Repo
git clone https://github.com/vishwajeet-ingole/ai-job-application-command-centre.git
cd ai-job-application-command-centre

2. Backend Setup
cd backend
npm install
npm run dev

Create .env file inside backend:

GEMINI_API_KEY=AQXXXXXXXXXXXXXXXXXXXXXXXXXX
PORT=5001

3. Frontend Setup
cd frontend
npm install
npm run dev

---

## 🎯 What makes this special

- End-to-end working AI career system
- Real-time job tracking + AI feedback loop
- Resume intelligence using Gemini AI
- Clean modular full-stack architecture
- Built for agentic workflows using Lemma SDK

## 🔗 Demo

Live demo: (add link here)
Demo video: (add link here)