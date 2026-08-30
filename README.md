# AI-Powered Language Deck Builder

Welcome to the **AI-Powered Language Deck Builder**! This is a client-side Single Page Application (SPA) designed to dynamically generate highly specific, niche language-learning flashcards. By providing a target language, native language, and a niche topic, the app leverages an OpenAI-compatible LLM to create structured flashcards which you can study directly in the browser with an interactive 3D UI, or export to Anki for long-term memorization.

---

## ✨ Features

- **Custom API Integration:** Connect to any OpenAI-compatible Chat Completions endpoint (OpenAI, Groq, OpenRouter, Together AI).
- **Secure Local Storage:** API keys and preferences are stored securely in your browser's local storage and are never sent anywhere except the API provider you configure.
- **Dynamic Content Generation:** Define niche topics (e.g., "Medical terminology in Spanish", "Tokyo subway navigation") and instantly get customized flashcards.
- **Interactive 3D Study UI:** Review generated cards with smooth, CSS-based 3D flip animations to reveal translations, pronunciation, and contextual sentences in both languages.
- **Export to Anki:** Instantly convert your generated deck into a standard Tab-Separated Values (`.tsv`) file that can be natively imported into Anki.
- **Pure Client-Side:** No backend database required. Fully ready for static deployment (like Cloudflare Pages).

---

## 🛠 Tech Stack

- **Framework:** React (bootstrapped with Vite)
- **Styling:** Tailwind CSS (for layout and modern design) + Custom CSS (for 3D flip animations)
- **Icons:** Lucide React
- **Language:** JavaScript (ES6+)

---

## 🚀 Setup Tutorial (Local Development)

Follow these steps to set up, build, and run the project locally on your machine.

### Prerequisites
Before you begin, ensure you have installed:
1. **Node.js** (v18 or higher recommended)
2. **npm** (Node Package Manager - comes with Node.js)

### Step-by-Step Installation

1. **Navigate to the Project Directory**
   Open your terminal (or Command Prompt / PowerShell) and navigate to the folder where the project is located:
   ```bash
   cd path/to/LangDeckBuild
   ```

2. **Install Dependencies**
   Run the following command to install React, Vite, Tailwind CSS, and all necessary dependencies from the `package.json` file:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   Once the installation is complete, start the local Vite development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   The terminal will output a local URL (usually `http://localhost:5173`). Open this URL in your web browser to view and interact with the application.

### Configuring the App in the Browser
1. Click the **Settings** icon (the gear in the top right).
2. Enter your **API Key**.
3. (Optional) Adjust the **Base URL** if you are using an alternative provider like Groq or OpenRouter. The default is `https://api.openai.com/v1/chat/completions`.
4. (Optional) Adjust the **Model Name** (default is `gpt-4o-mini`).
5. Click **Save Settings**. 

You are now ready to generate custom flashcard decks!

---

## 🌐 Deployment (Cloudflare Pages)

Because this app is a purely client-side SPA, deploying it is incredibly simple.

1. **Build the Production App**
   In your terminal, run the build command:
   ```bash
   npm run build
   ```
2. **Locate the Dist Folder**
   Vite will create a `dist` folder in your project directory containing the highly optimized, minified static HTML, JS, and CSS files.
3. **Deploy via Drag-and-Drop**
   - Log into your Cloudflare Dashboard and navigate to **Pages**.
   - Select **Create a project** -> **Direct Upload**.
   - Give your project a name.
   - Simply drag and drop the newly created `dist` folder into the upload box.
   - Cloudflare will deploy your application globally in seconds!

---

## 📝 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)** license.

For detailed terms, please see the [LICENSE.txt](./LICENSE.txt) file included in the root of this repository.

In short, you are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit.
- **NonCommercial** — You may not use the material for commercial purposes.
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.
