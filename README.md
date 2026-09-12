# PlantScan

PlantScan is a web application that helps identify plant diseases from photos of leaves or fruits using an AI vision API. After analyzing an image, the app provides a possible diagnosis, severity level, and treatment recommendations. Users can also continue the conversation through a built-in chatbot for follow-up plant care questions.

**Live Demo:** https://plantscan-webapp.vercel.app/

## Features

* **Plant Disease Detection** — Upload an image from your gallery or capture one with your camera to analyze leaves and fruits.
* **Diagnosis Results** — View the detected disease, possible causes, severity level, and recommended organic and chemical treatments.
* **Plant Care Chatbot** — Ask follow-up questions and get care recommendations based on the latest scan.
* **Image Validation** — Filters out non-plant images before sending them for analysis to improve result quality.
* **Progressive Web App (PWA)** — Install the app on mobile or desktop, with cached assets for faster loading.
* **Simulation Mode** — Run the app without an API key using mock data, making it easy to test the full user flow locally.
* **Bilingual Support** — Available in both English and Indonesian.
* **Admin Dashboard** — Includes a simple dashboard for viewing simulated scan history and usage statistics.

## Tech Stack

* **Frontend:** HTML5, CSS, Vanilla JavaScript
* **Backend:** Node.js Serverless Functions (Vercel)
* **AI Integration:** Vision API and AI Chat API

## Running Locally

### 1. Get an API Key

Generate an API key from your preferred AI provider.

### 2. Set Up Environment Variables

Copy the example environment file and add your API key:

```bash
cp .env.example .env
```

```env
API_KEY=your_api_key
```

### 3. Start the Application

**Option 1 — Using Vercel CLI (Recommended)**

Run the frontend and serverless API locally:

```bash
npx vercel dev
```

Then open `http://localhost:3000` in your browser.

**Option 2 — Using Live Server**

Open `index.html` with VS Code Live Server. The app will automatically switch to Simulation Mode and use mock data instead of calling the AI API.

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. Import the repository into Vercel.
3. Add your `API_KEY` as an Environment Variable.
4. Deploy.

## Project Structure

```text
api/
├── analyze.js       # Image analysis endpoint + rate limiting
├── chat.js          # Plant care chatbot endpoint
└── diseaseData.js   # Plant disease reference data

index.html           # Main application page
admin.html           # Admin dashboard
script.js            # Frontend logic
style.css            # Application styles
lang.js              # English / Indonesian translations
sw.js                # Service Worker (PWA)
vercel.json          # Vercel routing configuration
```

## Notes

* Uploaded images are processed only during analysis requests and are not stored on the server.
* A simple IP-based rate limiter is used on the backend to prevent API abuse.
* The application is designed to work with any compatible AI vision and chat API by configuring the API key in the environment variables.
