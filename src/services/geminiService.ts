interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

class GeminiService {
  private readonly apiKey = "AIzaSyC7t_H8QrV6X8j_9K2L3M4N5O6P7Q8R9S0T"; // Replace with your actual API key
  private readonly apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
      
      throw new Error("Invalid response format");
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I apologize, but I'm having trouble connecting to the AI service right now. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();