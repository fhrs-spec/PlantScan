// ============================================================
// 🩺 PLANT SCAN — AI PLANT DOCTOR CHATBOT ENDPOINT (api/chat.js)
// ============================================================

const MAX_REQUESTS = 10;          // Maksimal 10 chat per 5 menit
const WINDOW_MS = 5 * 60 * 1000;
const rateLimitMap = new Map();

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.windowStart > WINDOW_MS) rateLimitMap.delete(key);
  }
  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }
  if (now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }
  if (record.count >= MAX_REQUESTS) {
    return { allowed: false };
  }
  record.count++;
  return { allowed: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);
  if (!rateCheck.allowed) {
    return res.status(429).json({ error: 'Terlalu banyak pesan. Silakan tunggu beberapa menit.' });
  }

  const { userText, plantName, plantLatin, diseaseName, summary, lang } = req.body || {};

  if (!userText) {
    return res.status(400).json({ error: 'User message required' });
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  // SYSTEM PROMPT UNTUK CHATBOT PERAWATAN TANAMAN
  const isEn = lang === 'en';
  const systemInstruction = `
You are the official **Plant Care & Agronomy Assistant** for PlantScan.
Your role is to help farmers, botanists, and plant enthusiasts care for their plants, understand plant diseases, fertilizer application, watering routines, soil care, pest control, and agricultural best practices.

CURRENT DIAGNOSIS CONTEXT:
- Plant: ${plantName || 'Plant'} (${plantLatin || ''})
- Detected Condition/Disease: ${diseaseName || 'General Health'}
- Summary: ${summary || 'None'}

CRITICAL SCOPE RULE (STRICT GUARDRAIL):
- You MUST ONLY answer questions related to plants, botany, plant pathology, agriculture, farming, fertilizers, watering, soil, pests, diseases, crops, and plant care.
- IF the user's question is completely unrelated to plants/agriculture (e.g. asking for coding/python/javascript, math, politics, recipes, general trivia, stories, etc.):
  Politely DECLINE to answer and explicitly state that you are an **assistant specialized strictly in plant health and agriculture**.
  Example refusal: "${isEn ? 'Sorry, this assistant is specifically designed to answer questions related to plant health, pathology, fertilization, and crop care. Please feel free to ask anything about your plants! 🌿' : 'Maaf, asisten ini khusus dirancang untuk menjawab topik seputar kesehatan tanaman, penyakit tumbuhan, pemupukan, dan perawatan pertanian. Silakan tanyakan hal-hal yang berkaitan dengan tanaman atau hasil pemindaian Anda! 🌿'}"

FORMATTING RULES FOR ANSWERS:
- Keep responses concise, clear, encouraging, and structured (use bullet points and bold tags <strong> like <strong>Pupuk NPK</strong>).
- Use HTML formatting tags like <strong>, <em>, <br>, <ul>, <li> where appropriate (DO NOT use markdown backticks or markdown **).
- Use relevant emojis (🌿, 🧪, 💧, 🐛, 💊, 🛡️).
- Language: ${isEn ? 'English' : 'Indonesian'}.
`;

  // JIKA TIDAK ADA API KEY -> FALLBACK RESPON SIMULASI
  if (!apiKey || apiKey.length < 10) {
    return res.status(200).json({
      reply: null,
      fallback: true
    });
  }

  // API CALL
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-flash-latest'
  ];

  const requestBody = {
    contents: [
      {
        parts: [{ text: userText }]
      }
    ],
    system_instruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 1024
    }
  };

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        lastError = data.error ? data.error.message : 'API error';
        console.warn(`Model ${model} gagal: ${lastError}`);
        continue;
      }

      const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (replyText) {
        // Membersihkan jika AI membungkus dengan markdown
        const cleanReply = replyText.replace(/```html/g, '').replace(/```/g, '').trim();
        return res.status(200).json({ reply: cleanReply });
      }

    } catch (err) {
      console.error(`Chat error dengan model ${model}:`, err);
      lastError = err.message;
    }
  }

  // Jika gagal, kembalikan fallback
  return res.status(200).json({ reply: null, fallback: true, error: lastError });
}
