// const { GoogleGenAI } = require("@google/genai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} = require("../utils/prompts");

// 1. Direct string pass karein
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate blog content from title
// @route   POST /api/ai/generate
// @access  Private
const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;

    if (!title || !tone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `Write a markdown-formatted blog post titled "${title}". Use a ${tone} tone. Include an introduction, subheadings, code examples if relevant, and a conclusion.`;

    // 2. getGenerativeModel method use karein
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

    // 3. Model se content generate karein
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text(); // text() ek method hai

    return res.status(200).json({ success: true, data: rawText });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate blog post",
      error: error.message,
    });
  }
};

//@routes POST /api/ai/generate-ideas
const generateBlogPostIdeas = async (req, res) => {
  try {
    const { topics } = req.body;

    if (!topics) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogPostIdeasPrompt(topics);

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    // Markdown fences hatane ke liye clean regex
    const cleanedText = rawText
      .replace(/```json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseErr) {
      // Agar JSON parse na ho paye to raw text return karein
      data = cleanedText;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate blog post ideas",
      error: error.message,
    });
  }
};

//@routes POST /api/ai/generate-reply
const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = generateReplyPrompt({ author, content });

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text().trim();

    return res.status(200).json({ success: true, data: rawText });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate comment reply",
      error: error.message,
    });
  }
};

//@routes POST /api/ai/generate-summary
const generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = blogSummaryPrompt(content);

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.5,
      },
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    // Clean markdown code blocks if present
    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseErr) {
      // Agar summary plain text me aayi ho to raw text return karein
      data = cleanedText;
    }

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to generate post summary",
      error: error.message,
    });
  }
};

module.exports = {
  generateBlogPost,
  generateBlogPostIdeas,
  generateCommentReply,
  generatePostSummary,
};
