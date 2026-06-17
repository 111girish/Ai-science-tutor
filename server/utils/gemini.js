import getEnv from "../config.js";

const askGemini = async (subject, history, userMessage) => {
  const apiKey = getEnv("geminiApiKey");

  const systemPrompt = `You are a science tutor. The student has selected ${subject}. 
Only answer questions related to ${subject}. 
If the student asks about anything unrelated, politely redirect them back to ${subject}.`;

  const geminiHistory = history.map((hist) => {
    return {
      role: hist.sender ==="ai" ? "model" : "user",
      parts: [{text: hist.content}]
    }
  })
  
};

export default askGemini;
