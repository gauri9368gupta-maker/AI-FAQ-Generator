const express = require("express");
const Groq = require("groq-sdk");

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Paragraph is required",
      });
    }

    const prompt = `
Generate exactly 5 Frequently Asked Questions with answers from the paragraph below.

Return ONLY a valid JSON array.

Example:

[
  {
    "question": "What is AI?",
    "answer": "Artificial Intelligence..."
  }
]

Paragraph:
${text}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.5,
    });

    const output = completion.choices[0].message.content;

    const cleaned = output
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const faqs = JSON.parse(cleaned);

    res.json({
      success: true,
      faqs,
    });

  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;