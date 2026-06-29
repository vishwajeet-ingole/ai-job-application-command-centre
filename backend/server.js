require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");
const { LemmaClient } = require("lemma-sdk");

const resumeRoute = require("./routes/resume");
const jobsRoute = require("./routes/jobs");

const app = express();

/* ---------------- LEMMA SAFE INIT ---------------- */
let lemma = null;

try {
  lemma = new LemmaClient({
    token: process.env.LEMMA_TOKEN,
  });
} catch (err) {
  console.log("⚠️ Lemma init failed → fallback mode active");
}

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- GEMINI ---------------- */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ---------------- ROUTES ---------------- */
app.use("/resume", resumeRoute);
app.use("/jobs", jobsRoute);

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", async (req, res) => {
  try {
    let podCount = 0;

    if (lemma) {
      try {
        const pods = await lemma.pods.listByOrganization(
          process.env.LEMMA_ORG_ID
        );
        podCount = Array.isArray(pods) ? pods.length : 1;
      } catch (err) {
        console.log("⚠️ Lemma restricted mode → fallback active");
      }
    }

    res.json({
      status: "Backend Running",
      lemmaConnected: !!lemma,
      podCount,
    });
  } catch (err) {
    res.json({
      status: "Backend Running",
      lemmaConnected: false,
    });
  }
});

/* ---------------- CHAT API (CLEAN OUTPUT FIXED) ---------------- */
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

RULES:
- Reply in 5-8 short lines only
- No markdown (*, **, #)
- No long paragraphs
- No unnecessary greetings
- Be direct and helpful

User query:
${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = (response.text || "")
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/_/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    res.json({
      reply,
    });
  } catch (err) {
    console.error("Chat Error:", err);

    res.status(500).json({
      reply: "AI service error",
    });
  }
});

/* ---------------- JOB ANALYZER ---------------- */
app.post("/analyze-job", async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        error: "Job description required",
      });
    }

    const prompt = `
Extract structured job data:

Role:
Skills:
Experience:
Responsibilities:
Keywords:
Priority Score:

Job:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      analysis: (response.text || "").replace(/\*/g, "").trim(),
    });
  } catch (err) {
    console.error("Job Analysis Error:", err);

    res.status(500).json({
      error: "Job analysis failed",
    });
  }
});

/* ---------------- 404 ---------------- */
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