# 🌱 PlantScan - AI Plant Disease Scanner (Commercial SaaS Template)

PlantScan is an intelligent web application (built as a Progressive Web App / PWA) designed to help farmers, plant enthusiasts, and botanists detect plant diseases instantly. Leveraging Artificial Intelligence (Google Gemini Vision API), PlantScan analyzes photos of leaves or fruits, providing accurate diagnoses alongside treatment recommendations.

This template is built as a **Commercial SaaS Template**, ready to be used as a base project for client work, a commercial micro-SaaS startup, or developer portfolio.

---

## ✨ Key Features

- **🤖 Smart AI Detection**: Powered by Google Gemini Vision API for high-precision plant disease recognition and treatment solutions.
- **🌐 Dual-Language Support (i18n)**: Integrated bilingual system (English & Indonesian) dynamically supported across the entire interface.
- **🔒 SaaS Template Ready**: Features mock authentication powered by `localStorage`, including a **Guest Scan Limit** (1 free guest scan before requiring sign-in).
- **📊 Admin Dashboard**: Includes an admin dashboard page (`admin.html`) simulating user history, daily scan statistics, and AI performance metrics.
- **📱 Progressive Web App (PWA)**: Installable directly on iOS, Android, and Desktop like a native app. Includes a custom Service Worker for offline asset caching.
- **🛡️ Built-in Security & Rate Limiting**: Serverless IP-based rate limiting to prevent API spam and quota abuse.
- **⚡ Serverless Architecture**: Fast response times and zero server hosting fees using Vercel Serverless Functions.
- **🎨 Modern & Responsive UI/UX**: Elegant glassmorphism interface with smooth micro-animations, fully responsive across all screen sizes.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Framework-free, lightweight, & ultra-fast load speed).
- **Backend / API**: Node.js (Vercel Serverless Functions).
- **AI Engine**: Google Gemini API.

---

## 🚀 Setup & Installation Guide (Buyer Instructions)

Since PlantScan uses Vercel Serverless Functions for the API backend, the easiest way to deploy this application for free is via **Vercel**.

### 1. Get Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Log in and generate a new **API Key** for Gemini API.
3. Copy and save your API Key securely.

### 2. Configure Environment Variables
1. Duplicate or rename `.env.example` to `.env`.
2. Open `.env` and paste your Gemini API Key:
   ```env
   GEMINI_API_KEY=AIzaSyYourAPIKeyHere...
   ```
*(Note: Your `.env` file is excluded from git commits via `.gitignore` to keep your API keys secure).*

### 3. Deploy to Vercel (Fast & Free)
This repository includes a pre-configured `vercel.json` file.
1. Push this project folder to your private GitHub repository.
2. Log in to [Vercel](https://vercel.com/) using your GitHub account.
3. Click **Add New Project** and select your uploaded repository.
4. In the **Environment Variables** section on Vercel Dashboard, add a new variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: *(Paste your Gemini API Key here)*
5. Click **Deploy**. Done! Your PlantScan application is live and accessible globally.

---

## 📖 File & Directory Structure
- `index.html` : Main application entry point (Landing Page & AI Scanner interface).
- `admin.html` : Admin Dashboard interface (SaaS user analytics & scan statistics simulation).
- `style.css` : Complete design system with glassmorphism theme and responsive utilities.
- `lang.js` : Internationalization (i18n) dictionary and dynamic language switcher.
- `script.js` : Frontend logic (Camera capture, image upload, mock authentication, guest limit).
- `manifest.json` & `sw.js` : PWA web manifest and Service Worker caching configuration.
- `/api` : Vercel Serverless Backend folder.
  - `analyze.js` : Primary API endpoint handling Gemini Vision API communication, dynamic prompts, and rate-limiting security.

---

## 📄 License
This project is licensed to the buyer upon purchase completion. Redistribution of this source code publicly without permission is strictly prohibited unless explicitly agreed upon in the purchase contract.