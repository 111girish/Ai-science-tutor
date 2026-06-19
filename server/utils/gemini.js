import getEnv from "../config.js";

const askGemini = async (subject, history, userMessage) => {
  const geminiApiKey = getEnv("geminiApiKey");

  const systemPrompt = `You are a science tutor. The student has selected ${subject}. 
Only answer questions related to ${subject}. 
If the student asks about anything unrelated, politely redirect them back to ${subject}.`;

  const geminiHistory = history.map((hist) => {
    return {
      role: hist.sender ==="ai" ? "model" : "user",
      parts: [{text: hist.content}]
    }
  })
  geminiHistory.push({role: 'user', parts: [{text: userMessage}]});

    const apiKey = geminiApiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const bodyData = {
      system_instruction: {parts: [{text: systemPrompt}]},
      contents: geminiHistory
    }

    try{
      const result =await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      })

      if(!result.ok){
        throw new Error('Http error! ');
      }
      const data = await result.json();
      const finalData = data.candidates[0].content.parts[0].text;

      console.log("Success: ", finalData);
      return finalData;

    }catch(err){
      console.log(err);
      throw err;
    }

  
  
};

export default askGemini;
