import getEnv from "../config.js";

const askGemini = async (subject, history, userMessage) => {
  const apiKey = getEnv("geminiApiKey");

  const geminiHistory = history.map((hist) => {
    return {
      role: hist.sender ==="ai" ? "model" : "user",
      parts: [{text: hist.content}]
    }
  })
};

export default askGemini;
