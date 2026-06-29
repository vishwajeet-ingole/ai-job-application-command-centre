const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const { cleanAIText } = require("../utils/cleanAI");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message.",
      });
    }

    const prompt = `
You are AI Career OS Assistant.

Your personality:
- Professional
- Friendly
- Straight to the point

VERY IMPORTANT RULES:

- Maximum 6 short lines.
- Maximum 120 words.
- Never write essays.
- Never use Markdown.
- Never use *, **, #, ---, numbered headings.
- Never say "Great question", "I'd be happy to help", "Thanks for asking".
- Never repeat greetings.
- Never ask unnecessary follow-up questions.
- Give practical career advice immediately.
- Use simple English.
- Every line should be short.
- If possible use emojis like ✅ 💡 🚀 (maximum 2 emojis).
- Output must look clean inside a chat bubble.

Example style:

Resume Tips

• Keep it 1 page.
• Add measurable achievements.
• Match keywords with the job description.
• Use action verbs.
• Export as PDF.

Now answer this:

${message}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let reply = cleanAIText(response.text || "");

    // Extra cleanup
    reply = reply
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/```/g, "")
      .replace(/_{2,}/g, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    return res.json({
      reply,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      reply: "AI service unavailable.",
    });
  }
});

module.exports = router;