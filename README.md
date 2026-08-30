# AI-Powered Language Deck Builder

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/OpenAI_Compatible-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI API" />
</p>

Welcome to the **AI-Powered Language Deck Builder**! This is a client-side Single Page Application (SPA) designed to dynamically generate highly specific, niche language-learning flashcards. By providing a target language, native language, and a niche topic, the app leverages an OpenAI-compatible LLM to create structured flashcards which you can study directly in the browser with an interactive 3D UI, or export to Anki for long-term memorization.

---

## ✨ Features

- **Custom API Integration:** Connect to any OpenAI-compatible Chat Completions endpoint (OpenAI, Groq, OpenRouter, Together AI).
- **Secure Local Storage:** API keys and preferences are stored securely in your browser's local storage and are never sent anywhere except the API provider you configure.
- **Dynamic Content Generation:** Define niche topics (e.g., "Medical terminology in Spanish", "Tokyo subway navigation") and instantly get customized flashcards.
- **Interactive 3D Study UI:** Review generated cards with smooth, CSS-based 3D flip animations to reveal translations, pronunciation, and contextual sentences in both languages.
- **Export to Anki:** Instantly convert your generated deck into a standard Tab-Separated Values (`.tsv`) file that can be natively imported into Anki.
- **Pure Client-Side:** No backend database required. Fully ready for static deployment.

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

1. **Clone & Navigate to the Project Directory**
   Open your terminal and navigate to your folder:
   ```bash
   git clone https://github.com/90renrocraftcracksblogspotcom/langdeckbuild.git
   cd langdeckbuild
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

Since this project is pushed to a GitHub repository, deploying it via Cloudflare Pages is incredibly fast and allows for automatic deployments whenever you push new changes to the `main` branch.

### Step-by-Step GitHub Integration Deployment

1. **Log in to Cloudflare:** Navigate to your Cloudflare dashboard.
2. **Go to Pages:** Click on **Workers & Pages** in the left sidebar, then click **Create Application**, and select the **Pages** tab.
3. **Connect to Git:** Click on **Connect to Git**. Authorize Cloudflare to access your GitHub account if you haven't already.
4. **Select Repository:** Choose your `langdeckbuild` repository and click **Begin setup**.
5. **Configure Build Settings:** 
   This is the most critical step. Fill out the settings as follows:
   - **Framework preset:** Select `Vite` from the dropdown list.
   - **Build command:** Ensure this says `npm run build` (it should autofill if you selected Vite).
   - **Build output directory:** Ensure this says `dist` (it should autofill if you selected Vite).
   
   *(Note: For the language/environment, Cloudflare's default build environment supports modern Node versions out of the box, so you do not need to manually configure a specific language version).*
6. **Deploy:** Click **Save and Deploy**. 

Cloudflare will now clone your repo, run `npm install`, execute `npm run build`, and host the contents of the `dist` folder on a blazing-fast global CDN. Your app will automatically re-deploy every time you push to the `main` branch!

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
