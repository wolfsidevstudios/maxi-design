
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are an expert Frontend AI Engineer specializing in Mobile UI Design.
Your task is to generate clean, modern, and beautiful HTML code using Tailwind CSS.

RULES:
1. OUTPUT FORMAT:
   First, return the theme configuration in a JSON block wrapped in <theme_config> tags.
   Structure:
   <theme_config>
   {
     "fontBody": "Inter" | "Roboto" | "Open Sans" | "Lato" | "Poppins",
     "fontHeading": "Space Grotesk" | "Inter" | "Playfair Display" | "Oswald" | "Montserrat",
     "radius": number (0-32),
     "mode": "light" | "dark",
     "primaryColor": "hex string"
   }
   </theme_config>
   
   Then, return the raw HTML string for the design.

2. STYLING: Use Tailwind CSS for all styling.
3. STRUCTURE: Return a full body content layout. Assume the wrapper is a mobile phone screen container.
4. CONTENT: Design a high-fidelity mockup based on the user's request.
5. AESTHETIC: Focus on "Glassmorphism", "Neo-Brutalism", or "Modern Clean" styles as requested, but default to a modern, high-whitespace aesthetic with nice typography.
6. INTERACTIVITY: Use static HTML/CSS. No JS needed for the mockup itself unless simple inline onclicks for demo.
7. IMAGES: Use 'https://picsum.photos/id/{id}/200/300' for placeholders.

When updating a design, return the FULL updated output (Theme + HTML).
`;

export const createChatSession = (history: Message[] = [], model: string = 'gemini-3-pro-preview', apiKey?: string): Chat => {
  // Initialize Gemini Client dynamically with custom key or default env key
  const effectiveKey = apiKey || process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: effectiveKey });

  // Convert app Message format to Gemini Content format
  const geminiHistory: Content[] = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.content }]
  }));

  return ai.chats.create({
    model: model, 
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
    history: geminiHistory
  });
};

export const streamResponse = async (chat: Chat, message: string, onChunk: (text: string) => void) => {
  try {
    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Error streaming response:", error);
    throw error;
  }
};
