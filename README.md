# AI Code Explainer for Chrome


AI Code Explainer is a lightweight Chrome Extension designed to help developers and learners quickly understand code snippets on any webpage. Simply select the code, right-click, and let the power of Google's Gemini AI provide a clear, concise explanation.

---

## 🚀 Features

* **Gemini AI Powered:** Utilizes Google's advanced Gemini AI model for intelligent code analysis.
* **User-Provided API Key:** Securely use your own Gemini API key (obtained from Google AI Studio) to control usage and costs.
* **Clear & Concise Explanations:** Explanations are formatted for readability, including code blocks, inline code, and bold text.
* **Smart Code Detection:** Intelligently detects if selected text looks like actual code to avoid unnecessary explanations for plain English.

---

## ⚙️ How It Works

1.  **Select Code:** Highlight any code snippet on a webpage.
2.  **Button Appears:** Click on the extensions AI explain button.
3.  **AI Analysis:** The extension sends the selected code to the Gemini AI (using your provided API key).
4.  **Explanation Display:** A side panel appears in your browser with the AI-generated explanation.

---

## 🛠️ Installation

Since this is a custom Chrome Extension, you'll need to load it manually.

1.  **Clone the Repository:**
    
2.  **Open Chrome Extensions Page:**
    * Open your Chrome browser.
    * Type `chrome://extensions` in the address bar and press Enter.

3.  **Enable Developer Mode:**
    * In the top-right corner of the Extensions page, toggle on **"Developer mode"**.

4.  **Load Unpacked Extension:**
    * Click on the **"Load unpacked"** button that appears.
    * Navigate to the directory where you cloned the repository (the `YOUR_REPOSITORY_NAME` folder) and select it.

5.  **Pin the Extension (Optional but Recommended):**
    * Click the puzzle piece icon next to your profile avatar in Chrome's toolbar.
    * Find "AI Code Explainer" in the list and click the pin icon next to it to make it visible in your toolbar.

---

## 🔑 Setup & Usage

### 1. Get Your Gemini API Key

This extension requires your own Google Gemini API key. It's free to get started!

1.  Go to **[Google AI Studio](https://ai.google.dev/)**.
2.  Log in with your Google account.
3.  Follow the instructions to **"Get API key"** (usually found in the left sidebar under "Develop" -> "API key").
4.  Copy your generated API key.

### 2. Set Up the Extension with Your API Key

1.  Right-click on the "AI Code Explainer" extension icon (the sparkle icon) in your Chrome toolbar.
2.  Select **"Options"** (or "Extension options").
3.  Paste your copied Gemini API key into the input field.
4.  Click **"Save API Key"**.

### 3. Explain Code

1.  Navigate to any webpage containing code.
2.  **Select** a code snippet with your mouse.
3.  **Right-click** on the selected text.
4.  From the context menu, choose **"Explain with AI"**.
5.  The AI explanation panel will appear on the right side of your screen.

---

## 🎨 Customization

The appearance of the explanation panel can be customized by editing the `content.css` file within the extension's directory. Feel free to adjust colors, fonts, and layout to match your preferences!

---

## Troubleshooting

* **"API Key not set" error:** Ensure you've followed the "Set Up the Extension with Your API Key" steps correctly.
* **"No explanation found" or generic error:** The AI might not have generated a clear response, or there might be an issue with the prompt/API.
* **Selected text not explained:** Ensure the selected text is longer than 5 characters and appears to be code (e.g., contains common programming symbols or keywords).


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
*(You'll need to create a `LICENSE` file in your repository with the MIT License text if you haven't already.)*

---

## 🙏 Acknowledgements

* Powered by [Google Gemini API](https://ai.google.dev/).
