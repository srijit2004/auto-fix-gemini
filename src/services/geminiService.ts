
// Gemini API Service
const GEMINI_API_KEY = "AIzaSyDZ14mCII2eUwtVLQcUnNXosKlmnf8Illg";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export const getGeminiResponse = async (question: string) => {
  try {
    const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an Auto Repair Advisor. The user will ask about car problems, and you should diagnose the issue and suggest possible fixes. The question is: ${question}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return "Sorry, I encountered an error while processing your request. Please try again.";
    }

    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected API response format:", data);
      return "Sorry, I couldn't generate a response. Please try asking differently.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, there was a technical error. Please try again later.";
  }
};
