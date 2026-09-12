import { diseaseContexts } from './diseaseData.js';

// ============================================================
// 🛡️ SISTEM KEAMANAN — Rate Limiter, CORS, Payload Limit
// ============================================================

// Konfigurasi keamanan
const MAX_REQUESTS = 5;           // Maksimal 5 request...
const WINDOW_MS = 5 * 60 * 1000;  // ...per 5 menit (300.000 ms)
const MAX_PAYLOAD_BYTES = 5 * 1024 * 1024; // Batas ukuran gambar: 5 MB

// Penyimpanan rate limit di memori (bertahan selama container Vercel "warm")
const rateLimitMap = new Map();

/**
 * Mengambil alamat IP pengguna dari header request Vercel.
 * Vercel meneruskan IP asli pengguna lewat header 'x-forwarded-for'.
 */
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

/**
 * Memeriksa apakah IP sudah melewati batas request.
 * Mengembalikan objek: { allowed: boolean, remaining: number, resetInSeconds: number }
 */
function checkRateLimit(ip) {
  const now = Date.now();
  
  // Bersihkan entri yang sudah kadaluarsa
  for (const [key, value] of rateLimitMap.entries()) {
    if (now - value.windowStart > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }

  const record = rateLimitMap.get(ip);

  if (!record) {
    // IP baru, buat catatan pertama
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetInSeconds: 0 };
  }

  // Jika jendela waktu sudah lewat, reset
  if (now - record.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetInSeconds: 0 };
  }

  // Masih dalam jendela waktu
  if (record.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - record.windowStart)) / 1000);
    return { allowed: false, remaining: 0, resetInSeconds: resetIn };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count, resetInSeconds: 0 };
}

// ============================================================
// 🚀 HANDLER UTAMA
// ============================================================

export default async function handler(req, res) {
  // --- Keamanan 1: Hanya izinkan metode POST ---
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // --- Keamanan 2: CORS — Blokir request dari domain asing ---
  const host = req.headers.host || '';
  const origin = req.headers['origin'] || req.headers['referer'] || '';

  if (origin && host && !origin.includes(host)) {
    // Sebagai tambahan, izinkan URL spesifik Vercel dan localhost
    const isVercelUrl = process.env.VERCEL_URL && origin.includes(process.env.VERCEL_URL);
    const isProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && origin.includes(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');

    if (!isVercelUrl && !isProdUrl && !isLocalhost) {
      console.warn(`CORS blocked: origin=${origin} host=${host}`);
      return res.status(403).json({ error: 'Akses ditolak. Domain Anda tidak diizinkan menggunakan API ini.' });
    }
  }

  // --- Keamanan 3: Rate Limiting (5 scan per 5 menit per IP) ---
  const clientIP = getClientIP(req);
  const rateCheck = checkRateLimit(clientIP);

  // Sisipkan header informasi sisa kuota ke response
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
  res.setHeader('X-RateLimit-Remaining', rateCheck.remaining);

  if (!rateCheck.allowed) {
    const minutes = Math.floor(rateCheck.resetInSeconds / 60);
    const seconds = rateCheck.resetInSeconds % 60;
    const waitText = minutes > 0 ? `${minutes} menit ${seconds} detik` : `${seconds} detik`;
    return res.status(429).json({
      error: `Anda sudah melakukan ${MAX_REQUESTS}x scan. Silakan tunggu ${waitText} lagi sebelum mencoba kembali.`,
      retryAfterSeconds: rateCheck.resetInSeconds
    });
  }
  const { imageB64, imageBase64, plantName, plantLatin, plantId, lang } = req.body;
  
  const finalImage = imageB64 || imageBase64;

  if (!finalImage) {
    return res.status(400).json({ error: 'No image provided' });
  }

  // --- Keamanan 4: Payload Size Limit (maks 5 MB) ---
  const imageSizeBytes = Buffer.byteLength(finalImage, 'base64');
  if (imageSizeBytes > MAX_PAYLOAD_BYTES) {
    const sizeMB = (imageSizeBytes / (1024 * 1024)).toFixed(1);
    return res.status(413).json({ 
      error: `Ukuran gambar terlalu besar (${sizeMB} MB). Maksimal ${MAX_PAYLOAD_BYTES / (1024 * 1024)} MB.` 
    });
  }

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  // ==== MODE SIMULASI (DEMO) ====
  if (!apiKey || apiKey.length < 10) {
    console.log("Menjalankan Mode Simulasi Serverless...");
    
    // Tunda acak antara 1-2 detik agar proses analisis terasa natural
    const delay = Math.floor(Math.random() * 1500) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const isHealthy = Math.random() > 0.5;
    
    let mockResult = {};
    if (isHealthy) {
      mockResult = {
        scan_type: "daun",
        kondisi: "sehat",
        nama_penyakit: `${plantName} Sehat`,
        pathogen: "Tidak ada infeksi",
        tingkat_kepercayaan: Math.floor(Math.random() * 15) + 85,
        ringkasan: `Tanaman ${plantName} ini tampak sangat sehat dan terawat dengan baik.`,
        gejala_terlihat: "Warna daun hijau cerah merata, tidak ada bercak, tidak ada tanda-tanda serangan hama atau penyakit jamur.",
        penyebab: "-",
        dampak: "Tanaman dapat berfotosintesis dengan maksimal dan menghasilkan panen yang optimal.",
        rekomendasi: ["Lanjutkan rutinitas penyiraman secara teratur.", "Berikan pupuk berimbang sesuai fase pertumbuhan tanaman."],
        urgensi: "tidak perlu tindakan"
      };
    } else {
      mockResult = {
        scan_type: "daun",
        kondisi: "perhatian",
        nama_penyakit: `Bercak Daun Simulasi (${plantName})`,
        pathogen: "Fungi simulasi sp.",
        tingkat_kepercayaan: Math.floor(Math.random() * 10) + 80,
        ringkasan: `Ditemukan gejala awal infeksi jamur pada daun ${plantName} Anda.`,
        gejala_terlihat: "Terdapat bercak-bercak kecokelatan kecil dengan lingkaran halo kuning di sekitarnya.",
        penyebab: "Kelembapan yang terlalu tinggi memicu pertumbuhan spora jamur pada permukaan daun.",
        dampak: "Jika dibiarkan, bercak akan menyebar dan menyebabkan daun rontok prematur, menurunkan hasil panen.",
        rekomendasi: ["Kurangi intensitas penyiraman (jangan sampai daun terlalu basah).", "Segera pangkas dan buang daun yang telah terinfeksi ke tempat sampah.", "Aplikasikan fungisida berbahan aktif tembaga jika gejala makin meluas."],
        urgensi: "dalam seminggu"
      };
    }
    
    return res.status(200).json(mockResult);
  }

  // ==== MODE VISION API ====
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.5-flash-lite',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-flash-lite-latest'
  ];
  const systemPrompt = buildSystemPrompt(plantName, plantLatin, plantId, lang);
  const requestBody = {
    contents: [
      {
        parts: [
          { text: lang === 'en' ? "Perform a thorough analysis of this plant image based on the system instructions." : "Lakukan analisis menyeluruh pada gambar tanaman ini berdasarkan instruksi sistem." },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: finalImage
            }
          }
        ]
      }
    ],
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.4,
      topK: 32,
      topP: 1,
      maxOutputTokens: 2048,
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
        lastError = data.error ? data.error.message : 'Unknown API error';
        console.warn(`Model ${model} gagal: ${lastError}`);
        continue; // Lanjut ke model berikutnya
      }

      const textResponse = data.candidates[0].content.parts[0].text;
      
      // Membersihkan format JSON jika terdapat pembungkus markdown
      const cleanJson = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsed;
      try {
        parsed = JSON.parse(cleanJson);
      } catch(e) {
        throw new Error("Gagal mengurai respons JSON: " + cleanJson);
      }

      return res.status(200).json(parsed);

    } catch (error) {
      console.error(`Error dengan model ${model}:`, error);
      lastError = error.message;
    }
  }

  // Jika semua model gagal
  return res.status(500).json({ 
    error: `Layanan analisis gambar tidak dapat diakses saat ini. Error: ${lastError}` 
  });
}


function getDiseaseContext(plantId) {
  return diseaseContexts[plantId] || diseaseContexts.default;
}

function buildSystemPrompt(name, latin, id, lang) {
  const isEn = lang === 'en';
  
  const languageBlock = isEn
    ? `## LANGUAGE RULE (HIGHEST PRIORITY):
You MUST write ALL text values in English. 
The JSON keys must remain exactly as specified below (do NOT translate keys).
Every string value — disease names, descriptions, causes, symptoms, recommendations — MUST be in English.`
    : `## ATURAN BAHASA (PRIORITAS TERTINGGI):
Kamu WAJIB menulis SEMUA nilai teks dalam Bahasa Indonesia.
Key JSON harus tetap persis sesuai format di bawah (JANGAN terjemahkan key).
Setiap nilai string — nama penyakit, deskripsi, penyebab, gejala, rekomendasi — WAJIB dalam Bahasa Indonesia.`;

  const validationBlock = isEn
    ? `## CRITICAL VALIDATION TASK (ANTI-HALLUCINATION):
1. Examine the photo carefully. Does it really show a LEAF or FRUIT of a plant (especially ${name})?
2. IF THE PHOTO IS CLEARLY NOT A PLANT (e.g. photo of a person, animal, room, furniture, or other random object):
   - You MUST stop the analysis.
   - Set "nama_penyakit" to: "Unrecognized Object"
   - Set "kondisi" to: "error"
   - Set "gejala_terlihat" to: "The system detected that the uploaded photo is not a plant photo or is irrelevant."
   - Ignore other fields or fill with N/A.
3. If the photo is NOT ${name} but another plant, you may warn in "ringkasan" that it looks like a different plant.`
    : `## TUGAS VALIDASI KRITIS (ANTI-HALUSINASI):
1. Periksa foto dengan saksama. Apakah foto ini benar-benar menampilkan DAUN atau BUAH dari tanaman (terutama ${name})?
2. JIKA FOTO TERSEBUT JELAS BUKAN TANAMAN (misalnya foto manusia, hewan, ruangan, perabotan, atau objek acak lainnya):
   - Kamu WAJIB menghentikan analisis.
   - Isi field "nama_penyakit" dengan: "Objek Tidak Dikenali"
   - Isi field "kondisi" dengan: "error"
   - Isi field "gejala_terlihat" dengan: "Sistem mendeteksi bahwa foto yang diunggah bukan foto tanaman atau tidak relevan."
   - Abaikan field lain atau isi dengan N/A.
3. Jika foto BUKAN tanaman ${name} tapi tanaman lain, kamu boleh memperingatkan di "ringkasan" bahwa itu tampak seperti tanaman lain.`;

  const analysisBlock = isEn
    ? `## Analysis Tasks (IF VALID):
1. Identify whether the photo shows a leaf or fruit.
2. Check visual symptoms: discoloration, spots, texture, deformation, wilting, etc.
3. Determine condition: Healthy, Needs Attention (mild disease), or Severely Infected.
4. Provide specific diagnosis based on visible symptoms.
5. Provide practical treatment recommendations.`
    : `## Tugas Analisis (JIKA VALID):
1. Identifikasi apakah foto menunjukkan daun atau buah tanaman.
2. Periksa gejala visual: perubahan warna, bercak, tekstur, deformasi, layu, dll.
3. Tentukan kondisi: Sehat, Perlu Perhatian (penyakit ringan), atau Terinfeksi Parah.
4. Berikan diagnosis spesifik berdasarkan gejala yang terlihat.
5. Berikan rekomendasi penanganan yang praktis.`;

  const formatBlock = isEn
    ? `## Response Format (MUST be pure JSON, no markdown, no comments):
{
  "scan_type": "daun" or "buah" or "bukan tanaman",
  "kondisi": "sehat" or "perhatian" or "parah" or "error",
  "nama_penyakit": "Specific disease name IN ENGLISH, 'Healthy Leaf', or 'Unrecognized Object'",
  "pathogen": "Scientific name of pathogen or 'No infection'",
  "tingkat_kepercayaan": number 70-98,
  "ringkasan": "1-2 sentence summary IN ENGLISH",
  "gejala_terlihat": "Description of visible symptoms IN ENGLISH (2-3 sentences)",
  "penyebab": "Explanation of disease cause IN ENGLISH (2-3 sentences)",
  "dampak": "Impact on plant IN ENGLISH",
  "rekomendasi": [
    "Specific treatment step 1 IN ENGLISH",
    "Specific treatment step 2 IN ENGLISH"
  ],
  "urgensi": "segera" or "dalam seminggu" or "pantau saja" or "tidak perlu tindakan"
}

IMPORTANT: The keys ("kondisi", "urgensi" values like "segera", "sehat", "parah", etc.) must stay in Indonesian as shown. Only the descriptive text values must be in English.`
    : `## Format Respons (WAJIB JSON murni, tanpa markdown, tanpa komentar):
{
  "scan_type": "daun" atau "buah" atau "bukan tanaman",
  "kondisi": "sehat" atau "perhatian" atau "parah" atau "error",
  "nama_penyakit": "Nama penyakit spesifik DALAM BAHASA INDONESIA, 'Daun Sehat', atau 'Objek Tidak Dikenali'",
  "pathogen": "Nama ilmiah patogen atau 'Tidak ada infeksi'",
  "tingkat_kepercayaan": angka 70-98,
  "ringkasan": "1-2 kalimat ringkas DALAM BAHASA INDONESIA",
  "gejala_terlihat": "Deskripsi gejala visual DALAM BAHASA INDONESIA (2-3 kalimat)",
  "penyebab": "Penjelasan penyebab penyakit DALAM BAHASA INDONESIA (2-3 kalimat)",
  "dampak": "Dampak pada tanaman DALAM BAHASA INDONESIA",
  "rekomendasi": [
    "Langkah penanganan 1 DALAM BAHASA INDONESIA",
    "Langkah penanganan 2 DALAM BAHASA INDONESIA"
  ],
  "urgensi": "segera" atau "dalam seminggu" atau "pantau saja" atau "tidak perlu tindakan"
}`;

  const roleIntro = isEn
    ? `You are a leading plant pathologist specializing in diagnosing plant diseases from photos.
You will analyze a photo of a LEAF or FRUIT from the plant ${name} (${latin}).`
    : `Kamu adalah ahli patologi tanaman (plant pathologist) terkemuka yang berspesialisasi dalam mendiagnosis penyakit tanaman berdasarkan foto.
Kamu akan menganalisis foto DAUN atau BUAH dari tanaman ${name} (${latin}).`;

  const blurNote = isEn
    ? 'If the photo is unclear/blurry, still provide the best analysis based on what is visible.'
    : 'Jika foto tidak jelas / blur, tetap berikan analisis terbaik berdasarkan yang bisa terlihat.';

  return `${languageBlock}

${roleIntro}

${validationBlock}

## ${isEn ? 'Common Diseases of' : 'Penyakit Umum pada'} ${name}:
${getDiseaseContext(id)}

${analysisBlock}

${formatBlock}

${blurNote}`;
}

