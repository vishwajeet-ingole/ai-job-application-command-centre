require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { LemmaClient } = require("lemma-sdk");

const lemma = new LemmaClient({
  token: process.env.LEMMA_TOKEN,
});

const resumeRoute = require("./routes/resume");
const jobsRoute = require("./routes/jobs");

const app = express();

// Lemma SDK used as workflow infrastructure layer for agent-based job + resume pipelines

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

/* ---------------- GEMINI AI ---------------- */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ---------------- ROUTES ---------------- */
app.use("/resume", resumeRoute);
app.use("/jobs", jobsRoute);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", async (req, res) => {
  try {
    const pods = await lemma.pods.list();

    res.json({
      status: "Backend Running",
      lemmaConnected: true,
      podCount: pods.length,
    });
  } catch (err) {
    console.error(err);

    res.json({
      status: "Backend Running",
      lemmaConnected: false,
      error: err.message,
    });
  }
});

/* ---------------- CHAT API ---------------- */
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required.",
      });
    }

    const prompt = `
You are an AI Career Coach.

Help users with:
- Resume improvement
- Interview preparation
- Job search strategy
- DSA guidance
- Career roadmap
- Cover letters

User query:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      reply: response.text,
    });

  } catch (err) {
    console.error("Chat Error:", err);

    res.status(500).json({
      reply: "AI service error",
    });
  }
});

/* ---------------- JOB ANALYZER API ---------------- */
app.post("/analyze-job", async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        error: "Job description required",
      });
    }

    const prompt = `
Extract structured data from this job post:

Return JSON:
- role
- skills_required
- experience_level
- key_responsibilities
- suggested_resume_keywords
- apply_priority_score (1-10)

Job:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      analysis: response.text,
    });

  } catch (err) {
    console.error("Job Analysis Error:", err);

    res.status(500).json({
      error: "Job analysis failed",
    });
  }
});

/* ---------------- 404 HANDLER ---------------- */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

/* ---------------- SERVER START ---------------- */
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 AI Career OS Backend running on http://localhost:${PORT}`);
});