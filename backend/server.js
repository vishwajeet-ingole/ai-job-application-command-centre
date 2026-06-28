require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const resumeRoute = require("./routes/resume");
const jobsRoute = require("./routes/jobs");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json());

/* ---------------- ROUTES ---------------- */
app.use("/resume", resumeRoute);
app.use("/jobs", jobsRoute);

/* ---------------- GEMINI AI ---------------- */
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ---------------- HEALTH CHECK ---------------- */
app.get("/", (req, res) => {
  res.send("🚀 AI Career OS Backend Running");
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
    console.error("❌ Chat Error:", err);

    res.status(500).json({
      reply: "AI service error. Try again.",
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