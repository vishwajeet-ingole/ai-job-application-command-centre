const express = require("express");
const multer = require("multer");
const pdf = require("pdf-parse");
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
You are an ATS Resume Analyzer.

Analyze this resume and return:

Resume Score: __/100

Strengths:
- ...

Weaknesses:
- ...

Missing Skills:
- ...

Suggestions:
- ...

Resume:

${pdfData.text}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.json({
      analysis: response.text,
    });

  } catch (err) {
    console.error("========== RESUME ANALYZER ERROR ==========");
    console.error(err);
    console.error("===========================================");

    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      analysis: err.message || "Unknown error occurred.",
    });
  }
});

module.exports = router;