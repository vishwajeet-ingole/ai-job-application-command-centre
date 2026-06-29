const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
const { cleanAIText } = require("../utils/cleanAI");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* =========================
   RESUME ANALYZER
========================= */
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        analysis: "No resume file uploaded.",
      });
    }

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(dataBuffer);

    const prompt = `
You are an expert ATS Resume Analyzer and Career Coach.

STRICT OUTPUT FORMAT (NO MARKDOWN, NO *, NO **):

Resume Score: X/100

Strengths:
- point 1
- point 2

Weaknesses:
- point 1
- point 2

Missing Skills:
- skill 1
- skill 2

Suggestions:
- improvement 1
- improvement 2

Be strict, professional, and ATS-focused.

Resume Text:
${pdfData.text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // cleanup uploaded file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // CLEAN OUTPUT (IMPORTANT FIX)
    const cleanOutput = cleanAIText(response.text || "");

    return res.json({
      analysis: cleanOutput,
    });
  } catch (err) {
    console.error("RESUME ANALYSIS ERROR:", err);

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      analysis: "Resume analysis failed. Please try again.",
      error: err.message,
    });
  }
});

module.exports = router;