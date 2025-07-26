const API_KEY = "AIzaSyC_5j_K8zZ8ueGpCIjcIxWSHjQRpidSX-4";


import { GoogleGenAI } from 'https://esm.sh/@google/genai@^1.11.0';

if (!API_KEY) {
  console.error("API_KEY is not set. The extension will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function explainCode(code) {
  if (!code || code.trim().length === 0) {
    return { error: "Cannot explain an empty code snippet." };
  }

  const prompt = `
As an expert software engineer and technical writer, your task is to provide clear, concise, and user-friendly explanations for code snippets.

For each code snippet, explain:

What it does: High-level summary.

How it works: Core logic breakdown.

Key concepts: Important programming ideas.

Format your entire response using Markdown. Use double asterisks for bolding (e.g., **Key Concept**), backticks for inline code (e.g., \`const a = 1;\`), and triple backticks for larger code blocks.

Here is the code snippet to analyze:
\`\`\`
${code}
\`\`\`
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return { explanation: response.text };
  } catch (error) {
    console.error("Gemini API Error:", error);
    let errorMessage = "Failed to get an explanation from the AI. Please try again later.";
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('API_KEY_INVALID'))) {
        errorMessage = "The configured API key is invalid. Please check your configuration.";
    }
    return { error: errorMessage };
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'explainCode' && message.code) {
    explainCode(message.code).then(sendResponse);
    return true; 
  }
});