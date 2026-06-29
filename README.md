# 🚀 AI Career OS — AI-Powered Job Application Command Centre

An AI-powered **Career Management Platform** built for the **Gappy AI Hackathon 2026**. AI Career OS helps students and job seekers organize applications, improve resumes, receive AI-powered career guidance, and streamline their job search from a single dashboard.

---

# 🧠 Problem Statement

Managing multiple job applications is difficult for students and job seekers.

Common challenges include:

* Losing track of applications across different job portals
* Receiving little or no resume feedback
* Lack of personalized interview preparation
* No centralized AI-powered career assistant

These issues often result in missed opportunities and inefficient job searches.

---

# 💡 Solution

AI Career OS provides an intelligent command centre that combines:

* 📋 Job Application Tracker
* 🤖 AI Career Assistant (Google Gemini)
* 📄 AI Resume Analyzer
* 📊 Career Dashboard & Analytics
* 🚀 Lemma SDK Workflow Integration

---

# ✨ Features

## 📋 Smart Job Tracker

* Add new job applications
* Update application status
* Delete applications
* AI Priority Score for every job
* Real-time dashboard updates

---

## 🤖 AI Career Assistant

Powered by **Google Gemini**

Capabilities:

* Career guidance
* Interview preparation
* Resume improvement suggestions
* DSA roadmap recommendations
* Skill development advice

---

## 📄 AI Resume Analyzer

* Upload PDF resumes
* AI-powered resume analysis
* ATS optimization suggestions
* Strength & weakness detection
* Skill gap analysis

---

## 📊 Dashboard

Track everything in one place:

* Total Applications
* Interview Count
* Shortlisted Jobs
* Application Status

---

# 🧰 Tech Stack

## Frontend

* React
* Vite
* Axios
* Lucide Icons
* Recharts

## Backend

* Node.js
* Express.js
* Multer
* PDF Parse

## AI Layer

* Google Gemini API
* Lemma SDK

---

# 🏗️ System Architecture

```
React Frontend
        │
        ▼
Express Backend
        │
 ┌───────────────┐
 │ Google Gemini │
 │   Lemma SDK   │
 └───────────────┘
        │
        ▼
Application Data
```

---

# 🤖 AI Workflow

When a user adds a new job application:

1. The backend validates the request.
2. AI assigns a priority score.
3. A Lemma SDK workflow hook is triggered.
4. If Lemma services are available, the workflow executes through the SDK.
5. Otherwise, the application automatically switches to a safe local AI fallback.
6. The processed job is returned to the dashboard.

This architecture keeps the application modular, resilient, and ready for future agent-based automation.

---

# 🚀 Lemma SDK Integration

The project integrates the **Lemma SDK** to prepare the backend for agent-driven workflows.

Current implementation includes:

* Lemma SDK initialization
* Workflow trigger on job creation
* Backend workflow hook
* Safe fallback mode
* Modular architecture for future workflow orchestration

This ensures the application remains operational even if external workflow services are unavailable.

---

# 🚀 Setup

## Clone Repository

```bash
git clone https://github.com/vishwajeet-ingole/ai-job-application-command-centre.git
cd ai-job-application-command-centre
```

## Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env`

```
GEMINI_API_KEY=YOUR_API_KEY
PORT=5001
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

```
Backend:
http://localhost:5001

Frontend:
http://localhost:5173
```

---

# 🎯 Why AI Career OS?

* AI-powered career management platform
* Intelligent job application tracking
* Resume analysis using Google Gemini
* Lemma SDK workflow integration
* Safe fallback architecture
* Modern full-stack React + Node.js application
* Designed for future AI agent orchestration

---

# 🔗 Demo

**GitHub Repository:** *(https://github.com/vishwajeet-ingole/ai-job-application-command-centre)* 

**Demo Video:** *(Add YouTube / Drive URL)*

---

# 👨‍💻 Built For

**Gappy AI Hackathon 2026**
