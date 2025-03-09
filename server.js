const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());

// Set up CORS to allow cross-origin requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "Your name is SowSensei, and you are an Indian climatic and crop chatbot...",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const chatSession = model.startChat({
      generationConfig,
      history: [
        { role: "user", parts: [{ text: "hi" }] },
        { role: "model", parts: [{ text: "Vanakkam! I am SowSensei, your friendly Indian climatic and crop advisor. How can I help you today? 😊\n" }] },
      ],
    });

    const result = await chatSession.sendMessage(userMessage);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error handling chat request:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
